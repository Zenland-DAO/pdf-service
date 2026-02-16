/**
 * Utility functions for PDF generation
 */

import QRCode from 'qrcode';
import { marked } from 'marked';
import { formatUnits } from 'viem';
import type { EscrowData, ComputedDates, GeneratedUrls } from './types.js';

// ============================================================================
// DATE UTILITIES
// ============================================================================

/**
 * Format Unix timestamp to human-readable date
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format Unix timestamp to date with time
 */
export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

/**
 * Convert seconds to days
 */
export function secondsToDays(seconds: number): number {
  return Math.floor(seconds / (24 * 60 * 60));
}

const SEVEN_DAYS = 7 * 24 * 60 * 60;

/**
 * Compute all relevant dates from escrow data
 */
export function computeDates(data: EscrowData): ComputedDates {
  const createdTimestamp = data.createdAt;

  // NOTE: acceptance window is separate from buyerProtectionTime.
  // On-chain: sellerAcceptTimeSnapshot is snapshotted from the Factory.
  // For now we default to 7 days.
  const sellerAcceptTime = data.sellerAcceptTime ?? SEVEN_DAYS;
  const acceptanceDeadlineTimestamp = createdTimestamp + sellerAcceptTime;

  return {
    createdDate: formatDate(createdTimestamp),
    createdDateTime: formatDateTime(createdTimestamp),
    acceptanceDeadline: formatDate(acceptanceDeadlineTimestamp),
    acceptanceDays: secondsToDays(sellerAcceptTime),
    protectionDays: secondsToDays(data.buyerProtectionTime),
  };
}

// ============================================================================
// URL UTILITIES
// ============================================================================

const BASE_URL = 'https://zen.land';

/**
 * Generate all URLs for the contract
 */
export function generateUrls(escrowAddress: string): GeneratedUrls {
  return {
    acceptUrl: `${BASE_URL}/accept/${escrowAddress}`,
    verifyUrl: `${BASE_URL}/verify?contract=${escrowAddress}`,
    viewUrl: `${BASE_URL}/escrows/${escrowAddress}`,
  };
}

// ============================================================================
// QR CODE UTILITIES
// ============================================================================

/**
 * Generate QR code as base64 data URL
 */
export async function generateQRCode(data: string, size: number = 150): Promise<string> {
  try {
    return await QRCode.toDataURL(data, {
      width: size,
      margin: 1,
      color: {
        dark: '#1a1a2e',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });
  } catch {
    return '';
  }
}

// ============================================================================
// MARKDOWN UTILITIES
// ============================================================================

/**
 * Configure marked for safe rendering
 */
marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Render markdown to HTML
 */
export function renderMarkdown(markdown: string): string {
  if (!markdown || markdown.trim() === '') {
    return '<p class="terms-empty">No specific terms provided.</p>';
  }
  
  try {
    const html = marked.parse(markdown);
    // Wrap in a container for styling
    return `<div class="markdown-content">${html}</div>`;
  } catch {
    // Fallback to escaped plain text
    const escaped = markdown
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
    return `<div class="markdown-content"><p>${escaped}</p></div>`;
  }
}

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Format amount with token symbol
 */
export function formatAmount(amount: string, symbol: string): string {
  return `${amount} ${symbol}`;
}

/**
 * Format token units coming in as a "smallest unit" integer string.
 *
 * Example: for USDC (6 decimals):
 * - raw: "500000" -> "0.5"
 * - raw: "1000000" -> "1"
 */
export function formatTokenUnits(rawAmount: string, decimals: number): string {
  try {
    return formatUnits(BigInt(rawAmount || '0'), decimals);
  } catch {
    // If the string is not a valid bigint (already decimal formatted), just return as-is.
    return rawAmount;
  }
}

/**
 * Get dispute resolution text based on agent status
 */
export function getDisputeResolutionText(agentAddress: string | null, isLocked: boolean): string {
  if (isLocked || !agentAddress) {
    return 'This contract is LOCKED. No third-party dispute agent is assigned. Disputes must be resolved through mutual agreement between buyer and seller, or the seller may issue a refund.';
  }

  // IMPORTANT: matches on-chain permissions (V1):
  // - only buyer can open dispute
  // - either party can invite agent (after dispute)
  return `Disputes can be opened by the buyer after the contract is accepted. Once disputed, either party may invite the assigned agent to resolve the dispute. The agent will review evidence from both parties and make a binding decision.`;
}

/**
 * Get contract status text
 */
export function getStatusText(isLocked: boolean): string {
  return isLocked ? 'Locked (No Agent)' : 'With Dispute Agent';
}
