/**
 * Type definitions for escrow PDF generation
 */

export interface EscrowData {
  // Contract info
  escrowAddress: string;
  network: string;
  chainId: number;
  
  // Parties
  buyerAddress: string;
  sellerAddress: string;
  agentAddress: string | null;
  
  // Transaction
  amount: string;
  tokenSymbol: string;
  tokenAddress: string;
  /** Token decimals for amount/fees formatting (e.g. USDC = 6). Optional for backwards compatibility. */
  tokenDecimals?: number;
  creationFee: string;
  assignmentFee: string;
  
  // Terms
  terms: string;
  isLocked: boolean;
  
  // Timestamps
  createdAt: number;
  buyerProtectionTime: number;

  /**
   * Seller acceptance window (seconds).
   * Contract is created+funded in PENDING; seller must accept within this window.
   */
  sellerAcceptTime?: number;

  /**
   * Agent response time window (seconds).
   * Used for describing the agent timeout behavior in the PDF.
   */
  agentResponseTime?: number;
  
  // Language
  language: 'en' | 'ru' | 'es' | 'zh';
}

export interface ComputedDates {
  createdDate: string;
  createdDateTime: string;
  acceptanceDeadline: string;
  acceptanceDays: number;
  protectionDays: number;
}

export interface GeneratedUrls {
  acceptUrl: string;
  verifyUrl: string;
  viewUrl: string;
}
