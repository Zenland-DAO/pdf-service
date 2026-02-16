/**
 * Page 3: Terms & How It Works
 * 
 * Displays the agreement terms (rendered from markdown) and
 * explains how the smart contract escrow process works.
 */

import type { EscrowData, ComputedDates } from './types.js';
import { renderMarkdown } from './utils.js';
import { securityLockIcon, smallCheckIcon, flowArrowIcon } from './icons.js';
import { zenlandLogoSvg } from './brand.js';

export interface Page4Props {
  data: EscrowData;
  dates: ComputedDates;
}

export function generatePage4(props: Page4Props): string {
  const { data, dates } = props;
  
  const renderedTerms = renderMarkdown(data.terms);

  return `
    <div class="page">
      <!-- Header -->
      <div class="header">
        <div class="logo">${zenlandLogoSvg}</div>
        <div class="page-indicator">Page 3 of 4</div>
      </div>

      <!-- Page Content -->
      <div class="page-content">
        <!-- Agreement Terms -->
        <div class="section-title">Agreement Terms</div>
        <div class="terms-box">
          ${renderedTerms}
        </div>

        <!-- How It Works -->
        <div class="section-title" style="margin-top: 24px;">How This Smart Contract Works</div>
        
        <div class="flow-container">
          <div class="flow-steps">
            <div class="flow-step">
              <div class="flow-step-number">1</div>
              <div class="flow-step-label">Deposit</div>
            </div>
            <span class="flow-arrow">${flowArrowIcon()}</span>
            <div class="flow-step">
              <div class="flow-step-number">2</div>
              <div class="flow-step-label">Accept</div>
            </div>
            <span class="flow-arrow">${flowArrowIcon()}</span>
            <div class="flow-step">
              <div class="flow-step-number">3</div>
              <div class="flow-step-label">Deliver</div>
            </div>
            <span class="flow-arrow">${flowArrowIcon()}</span>
            <div class="flow-step">
              <div class="flow-step-number">4</div>
              <div class="flow-step-label">Release</div>
            </div>
          </div>
        </div>

        <div class="card" style="margin-top: 0;">
          <div style="display: flex; gap: 16px;">
            <div style="flex: 1;">
              <h4 style="font-size: 11px; font-weight: 700; color: var(--primary-700); margin-bottom: 6px;">
                1. DEPOSIT
              </h4>
              <p style="font-size: 10px; color: var(--neutral-600); line-height: 1.5;">
                The buyer creates the contract and deposits funds (${data.amount} ${data.tokenSymbol}) 
                into the smart contract. Funds are locked and cannot be accessed by either party.
              </p>
            </div>
            <div style="flex: 1;">
              <h4 style="font-size: 11px; font-weight: 700; color: var(--primary-700); margin-bottom: 6px;">
                2. ACCEPT
              </h4>
              <p style="font-size: 10px; color: var(--neutral-600); line-height: 1.5;">
                The seller reviews the terms and accepts the contract. This activates the escrow 
                (PENDING → ACTIVE) and commits both parties to the agreement.
              </p>
            </div>
          </div>
          <div style="display: flex; gap: 16px; margin-top: 12px;">
            <div style="flex: 1;">
              <h4 style="font-size: 11px; font-weight: 700; color: var(--primary-700); margin-bottom: 6px;">
                3. DELIVER
              </h4>
              <p style="font-size: 10px; color: var(--neutral-600); line-height: 1.5;">
                The seller delivers the goods or services as specified in the agreement terms. 
                Both parties communicate and track progress.
              </p>
            </div>
            <div style="flex: 1;">
              <h4 style="font-size: 11px; font-weight: 700; color: var(--primary-700); margin-bottom: 6px;">
                4. RELEASE
              </h4>
              <p style="font-size: 10px; color: var(--neutral-600); line-height: 1.5;">
                After the seller confirms fulfillment, the buyer may release funds at any time. 
                If the buyer does not release, the seller may claim funds after the buyer protection period ends.
                ${data.isLocked ? 'If there is a dispute, parties must mutually agree or seller can refund.' : 'If there is a dispute, the buyer can open it and either party may invite the agent.'}
              </p>
            </div>
          </div>
        </div>

        <!-- Smart Contract Guarantees -->
        <div class="section-title" style="margin-top: 24px;">Smart Contract Guarantees</div>
        <div class="card card-highlight">
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            <div style="flex: 1; min-width: 200px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span>${smallCheckIcon()}</span>
                <strong style="font-size: 11px; color: var(--neutral-800);">Funds Secured on Blockchain</strong>
              </div>
              <p style="font-size: 10px; color: var(--neutral-600); margin-left: 24px;">
                ${data.amount} ${data.tokenSymbol} is locked in an immutable smart contract.
              </p>
            </div>
            <div style="flex: 1; min-width: 200px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span>${smallCheckIcon()}</span>
                <strong style="font-size: 11px; color: var(--neutral-800);">Automatic Enforcement</strong>
              </div>
              <p style="font-size: 10px; color: var(--neutral-600); margin-left: 24px;">
                Contract rules are enforced by code, not by trust.
              </p>
            </div>
            <div style="flex: 1; min-width: 200px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span>${smallCheckIcon()}</span>
                <strong style="font-size: 11px; color: var(--neutral-800);">Buyer Protection: ${dates.protectionDays} Days</strong>
              </div>
              <p style="font-size: 10px; color: var(--neutral-600); margin-left: 24px;">
                Starts when the seller confirms fulfillment. Seller can claim after ${dates.protectionDays} days.
              </p>
            </div>
            <div style="flex: 1; min-width: 200px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span>${smallCheckIcon()}</span>
                <strong style="font-size: 11px; color: var(--neutral-800);">
                  ${data.isLocked ? 'Mutual Agreement Required' : 'Agent Dispute Resolution'}
                </strong>
              </div>
              <p style="font-size: 10px; color: var(--neutral-600); margin-left: 24px;">
                ${data.isLocked 
                  ? 'Disputes resolved by mutual consent or seller refund.' 
                  : 'Third-party agent available for fair dispute resolution.'}
              </p>
            </div>
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
          <span>Contract: ${data.escrowAddress.slice(0, 10)}...${data.escrowAddress.slice(-8)}</span>
        </div>
      </div>
    </div>
  `;
}
