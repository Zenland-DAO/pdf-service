/**
 * Page 1: Cover & Contract Summary
 * 
 * The first page serves as the cover with contract identification,
 * key information, and explanation of what this document is.
 */

import type { EscrowData, ComputedDates, GeneratedUrls } from './types.js';
import { securityLockIcon } from './icons.js';
import { zenlandLogoSvg, zenlandMarkSvg } from './brand.js';

export interface Page1Props {
  data: EscrowData;
  dates: ComputedDates;
  urls: GeneratedUrls;
  viewQrCode: string;
}

export function generatePage1(props: Page1Props): string {
  const { data, dates, urls, viewQrCode } = props;

  return `
    <div class="page">
      <!-- Header -->
      <div class="header">
        <div class="logo">${zenlandLogoSvg}</div>
        <div class="page-indicator">Page 1 of 4</div>
      </div>

      <!-- Page Content -->
      <div class="page-content">
        <!-- Title -->
        <div class="text-center mb-16">
          <h1 class="title-large">DIGITAL SMART CONTRACT</h1>
          <p class="subtitle">Blockchain Escrow Agreement</p>
        </div>

        <!-- Contract Identifier Box -->
        <div class="contract-id-box">
          <div class="contract-id-watermark" aria-hidden="true">${zenlandMarkSvg}</div>
          <div class="contract-id-label">Contract Identifier</div>
          <div class="contract-id-value">${data.escrowAddress}</div>
          <div class="contract-meta">
            <span>Network: ${data.network}</span>
            <span>Generated: ${dates.createdDate}</span>
            <span>Status: Awaiting Acceptance</span>
          </div>
        </div>

        <!-- What is this document? -->
        <div class="explanation-box">
          <div class="explanation-title">What is this document?</div>
          <div class="explanation-text">
            This PDF represents a <strong>blockchain-based smart contract escrow agreement</strong> 
            deployed on ${data.network}. The funds are secured by an immutable smart contract 
            controlled by Zenland DAO.
            
            <ul class="explanation-list">
              <li><strong>Funds are held securely</strong> – ${data.amount} ${data.tokenSymbol} is locked in the escrow contract until conditions are met.</li>
              <li><strong>All transactions are transparent</strong> – Every action is recorded on the blockchain and can be verified.</li>
              <li><strong>No single party can manipulate the outcome</strong> – The smart contract enforces the agreement terms automatically.</li>
            </ul>
          </div>
        </div>

        <!-- Transaction Summary -->
        <div class="section-title">Transaction Summary</div>
        <div class="card">
          <div class="detail-row">
            <span class="detail-label">Escrow Amount</span>
            <span class="detail-value amount">${data.amount} ${data.tokenSymbol}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Acceptance Period</span>
            <span class="detail-value">${dates.acceptanceDays} days</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Buyer Protection Period</span>
            <span class="detail-value">${dates.protectionDays} days (starts after seller fulfillment)</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Contract Type</span>
            <span class="detail-value">${data.isLocked ? 'Locked (No Agent)' : 'With Dispute Agent'}</span>
          </div>
        </div>

        <!-- QR Code Section -->
        <div class="qr-section">
          <div class="qr-code">
            <img src="${viewQrCode}" alt="View Contract QR Code" />
          </div>
          <div class="qr-content">
            <h4>View Contract on Blockchain</h4>
            <p>Scan this QR code or visit the URL below to view the live contract status on the blockchain.</p>
            <div class="qr-url">${urls.viewUrl}</div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="security-notice">
          <span class="security-notice-icon">${securityLockIcon()}</span>
          <span class="security-notice-text">
            <strong>Security Notice:</strong> Always verify URLs. Only use <strong>zen.land</strong> or search "Zenland" on Google.
          </span>
        </div>
        <div class="footer-content">
          <span>Zenland DAO • Trustless Blockchain Escrow</span>
          <span>Document v2.0 • Generated: ${dates.createdDate}</span>
        </div>
      </div>
    </div>
  `;
}
