/**
 * Page 2: Parties & Transaction Details
 * 
 * Shows all contract parties (buyer, seller, agent) and
 * detailed transaction information including fees and deadlines.
 */

import type { EscrowData, ComputedDates } from './types.js';
import { formatTokenUnits, getDisputeResolutionText } from './utils.js';
import { zenlandLogoSvg } from './brand.js';
import { 
  partyUserIcon, 
  agentShieldIcon, 
  lockedContractIcon, 
  deadlineClockIcon, 
  securityLockIcon 
} from './icons.js';

export interface Page2Props {
  data: EscrowData;
  dates: ComputedDates;
}

export function generatePage2(props: Page2Props): string {
  const { data, dates } = props;
  
  const disputeText = getDisputeResolutionText(data.agentAddress, data.isLocked);
  const tokenDecimals = data.tokenDecimals ?? 6;
  const creationFeeFormatted = formatTokenUnits(data.creationFee, tokenDecimals);
  const assignmentFeeFormatted = formatTokenUnits(data.assignmentFee, tokenDecimals);

  return `
    <div class="page">
      <!-- Header -->
      <div class="header">
        <div class="logo">${zenlandLogoSvg}</div>
        <div class="page-indicator">Page 2 of 4</div>
      </div>

      <!-- Page Content -->
      <div class="page-content">
        <!-- Parties Section -->
        <div class="section-title">Parties to this Contract</div>
        
        <div class="two-columns">
          <!-- Buyer -->
          <div class="party-card">
            <div class="party-header">
              <div class="party-icon">${partyUserIcon()}</div>
              <div>
                <div class="party-role">Buyer</div>
                <div class="party-status">Contract Creator • Funds Deposited</div>
              </div>
            </div>
            <div class="party-address">${data.buyerAddress}</div>
          </div>

          <!-- Seller -->
          <div class="party-card">
            <div class="party-header">
              <div class="party-icon">${partyUserIcon()}</div>
              <div>
                <div class="party-role">Seller</div>
                <div class="party-status">Awaiting Acceptance</div>
              </div>
            </div>
            <div class="party-address">${data.sellerAddress}</div>
          </div>
        </div>

        <!-- Agent -->
        <div class="agent-card ${data.isLocked || !data.agentAddress ? 'locked' : ''}">
          <div class="party-header">
            <div class="party-icon">${data.isLocked || !data.agentAddress ? lockedContractIcon() : agentShieldIcon()}</div>
            <div>
              <div class="party-role">Dispute Resolution</div>
              <div class="party-status">
                ${data.isLocked || !data.agentAddress ? 'LOCKED - No Third-Party Agent' : 'Agent Assigned'}
              </div>
            </div>
          </div>
          ${data.agentAddress && !data.isLocked 
            ? `<div class="party-address">${data.agentAddress}</div>` 
            : ''}
          <p style="font-size: 10px; color: var(--neutral-600); margin-top: 10px; line-height: 1.5;">
            ${disputeText}
          </p>
        </div>

        <!-- Transaction Details -->
        <div class="section-title" style="margin-top: 24px;">Transaction Details</div>
        
        <div class="card">
          <div class="detail-row">
            <span class="detail-label">Escrow Amount</span>
            <span class="detail-value amount">${data.amount} ${data.tokenSymbol}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Token Contract</span>
            <span class="detail-value" style="font-size: 9px;">${data.tokenAddress}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Creation Fee</span>
            <span class="detail-value">${creationFeeFormatted} ${data.tokenSymbol}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Assignment Fee</span>
            <span class="detail-value">${assignmentFeeFormatted} ${data.tokenSymbol}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Network</span>
            <span class="detail-value">${data.network}</span>
          </div>
        </div>

        <!-- Deadline Box -->
        <div class="deadline-box">
          <div class="deadline-header">
            <span class="deadline-icon">${deadlineClockIcon()}</span>
            <span class="deadline-title">Acceptance Deadline</span>
          </div>
          <p class="deadline-text">
            This contract must be accepted by the seller within the acceptance period.
            If not accepted by the deadline, the buyer may reclaim the deposited funds.
          </p>
          <div class="deadline-date">
            Deadline: ${dates.acceptanceDeadline}
          </div>
          <p class="deadline-text">
            (${dates.acceptanceDays} days from PDF generation time; actual on-chain deadline is from escrow creation)
          </p>
        </div>

        <!-- Important Dates -->
        <div class="section-title" style="margin-top: 24px;">Important Dates</div>
        <div class="card">
          <div class="detail-row">
            <span class="detail-label">PDF Generated</span>
            <span class="detail-value">${dates.createdDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Acceptance Deadline</span>
            <span class="detail-value" style="color: #ee5253; font-weight: 700;">${dates.acceptanceDeadline}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Buyer Protection Ends</span>
            <span class="detail-value">${dates.protectionDays} days after seller confirms fulfillment</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-content">
          <span>Zenland DAO • Trustless Blockchain Escrow</span>
          <span>Contract: ${data.escrowAddress.slice(0, 10)}...${data.escrowAddress.slice(-8)}</span>
        </div>
      </div>
    </div>
  `;
}
