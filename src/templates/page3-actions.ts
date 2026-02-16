/**
 * Page 4: Actions & Verification
 * 
 * The final page with call-to-action for accepting the contract,
 * verification instructions, and security notices.
 */

import type { EscrowData, ComputedDates, GeneratedUrls } from './types.js';
import { acceptDocumentCheckIcon, verifyCheckIcon, securityLockIcon } from './icons.js';
import { zenlandLogoSvg } from './brand.js';

export interface Page3Props {
  data: EscrowData;
  dates: ComputedDates;
  urls: GeneratedUrls;
  acceptQrCode: string;
  verifyQrCode: string;
}

export function generatePage3(props: Page3Props): string {
  const { data, dates, urls, acceptQrCode, verifyQrCode } = props;

  return `
    <div class="page">
      <!-- Header -->
      <div class="header">
        <div class="logo">${zenlandLogoSvg}</div>
        <div class="page-indicator">Page 4 of 4</div>
      </div>

      <!-- Page Content -->
      <div class="page-content">
        <!-- Accept Contract Action -->
        <div class="action-box">
          <div class="action-header">
            <span class="action-icon">${acceptDocumentCheckIcon()}</span>
            <span class="action-title">Accept This Contract</span>
          </div>
          <div class="action-content">
            <div class="action-qr">
              <img src="${acceptQrCode}" alt="Accept Contract QR Code" />
            </div>
            <div class="action-details">
              <p style="font-size: 11px; margin-bottom: 10px; opacity: 0.95;">
                To accept this contract and activate the escrow, visit the link below or scan the QR code:
              </p>
              <div class="action-url">${urls.acceptUrl}</div>
              <div class="action-deadline">
                <span>Acceptance Deadline:</span>
                <strong>${dates.acceptanceDeadline}</strong>
              </div>
            </div>
          </div>
        </div>

        <p style="font-size: 10px; color: var(--neutral-600); text-align: center; margin: 12px 0;">
          If the contract is not accepted by the deadline, the buyer may reclaim the deposited funds.
        </p>

        <!-- Verify Contract -->
        <div class="verify-box">
          <div class="verify-header">
            <span class="verify-icon">${verifyCheckIcon()}</span>
            <span class="verify-title">Verify This Contract</span>
          </div>
          <div class="verify-content">
            <div class="verify-qr">
              <img src="${verifyQrCode}" alt="Verify Contract QR Code" />
            </div>
            <div class="verify-text">
              <p>
                To confirm this contract is authentic and has not been tampered with, 
                upload this PDF to our verification page:
              </p>
              <ul class="verify-list">
                <li>Contract exists on blockchain</li>
                <li>Terms hash matches the original</li>
                <li>All data is authentic and unmodified</li>
              </ul>
              <div class="verify-url">${urls.verifyUrl}</div>
            </div>
          </div>
        </div>

        <!-- Security Notice (Large) -->
        <div class="section-title" style="margin-top: 24px;">Security Notice</div>
        <div class="card card-warning">
          <h4 style="font-size: 12px; font-weight: 700; color: var(--neutral-900); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
            <span>${securityLockIcon()}</span>
            Protect Yourself from Phishing
          </h4>
          <div style="font-size: 11px; color: var(--neutral-700); line-height: 1.6;">
            <p style="margin-bottom: 10px;">
              To ensure you're using the authentic Zenland platform and not a phishing site:
            </p>
            <ul style="margin: 0; padding-left: 20px;">
              <li style="margin: 6px 0;">
                <strong>Always use ONLY:</strong> <code style="background: white; padding: 2px 6px; border-radius: 3px; font-family: monospace;">zen.land</code>
              </li>
              <li style="margin: 6px 0;">
                <strong>Or search "Zenland"</strong> on Google to find the official website
              </li>
              <li style="margin: 6px 0;">
                <strong>Never click links</strong> from unknown or untrusted sources
              </li>
              <li style="margin: 6px 0;">
                <strong>Verify contract addresses</strong> on a blockchain explorer before transacting
              </li>
              <li style="margin: 6px 0;">
                <strong>Check the URL</strong> in your browser's address bar before connecting your wallet
              </li>
            </ul>
          </div>
        </div>

        <!-- Contract Summary -->
        <div class="card" style="background: var(--primary-50); border-color: var(--primary-200);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 10px; color: var(--neutral-500); text-transform: uppercase; letter-spacing: 0.5px;">
                Contract Address
              </div>
              <div style="font-size: 10px; font-family: 'Courier New', monospace; color: var(--primary-700); margin-top: 4px;">
                ${data.escrowAddress}
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 10px; color: var(--neutral-500); text-transform: uppercase; letter-spacing: 0.5px;">
                Amount
              </div>
              <div style="font-size: 14px; font-weight: 700; color: var(--primary-700); margin-top: 4px;">
                ${data.amount} ${data.tokenSymbol}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">        
        <div class="footer-content">
          <span>Zenland DAO • Trustless Blockchain Escrow</span>
          <span>Powered by Ethereum Smart Contracts • Document v2.0</span>
        </div>
      </div>
    </div>
  `;
}
