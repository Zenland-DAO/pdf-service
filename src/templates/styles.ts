/**
 * CSS styles for escrow PDF - Zenland Design System
 * 
 * Uses Zenland Blue color scheme and professional typography
 */

export const baseStyles = `
  /* ============================================
     CSS Reset & Base
     ============================================ */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  @page {
    size: A4 portrait;
    margin: 0;
  }
  
  html, body {
    width: 210mm;
    min-height: 297mm;
  }
  
  body {
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
    font-size: 11px;
    line-height: 1.5;
    color: #1a1a2e;
    background: white;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* ============================================
     Color Variables (Zenland Blue)
     ============================================ */
  :root {
    --primary-50: #eff6ff;
    --primary-100: #dbeafe;
    --primary-200: #bfdbfe;
    --primary-300: #93c5fd;
    --primary-400: #60a5fa;
    --primary-500: #3c97ff;
    --primary-600: #2563eb;
    --primary-700: #1d4ed8;
    --primary-800: #1e40af;
    --primary-900: #1a1a2e;
    
    --success-500: #10b981;
    --success-100: #d1fae5;
    
    --warning-500: #f59e0b;
    --warning-100: #fef3c7;
    
    --neutral-50: #f8fafc;
    --neutral-100: #f1f5f9;
    --neutral-200: #e2e8f0;
    --neutral-300: #cbd5e1;
    --neutral-400: #94a3b8;
    --neutral-500: #64748b;
    --neutral-600: #475569;
    --neutral-700: #334155;
    --neutral-800: #1e293b;
    --neutral-900: #0f172a;
  }

  /* ============================================
     Page Layout
     ============================================ */
  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 10mm 18mm;
    page-break-after: always;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  
  .page:last-child {
    page-break-after: auto;
  }
  
  .page-content {
    flex: 1;
  }

  /* ============================================
     Header
     ============================================ */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
    border-bottom: 2px solid var(--primary-500);
    margin-bottom: 14px;
  }
  
  .logo {
    height: 32px;
  }
  
  .page-indicator {
    font-size: 10px;
    color: var(--neutral-500);
    font-weight: 500;
  }

  /* ============================================
     Footer
     ============================================ */
  .footer {
    margin-top: auto;
    padding-top: 5px;
    border-top: 1px solid var(--neutral-200);
    font-size: 9px;
    color: var(--neutral-500);
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
  }

  .footer-content span {
    white-space: nowrap;
  }
  
  .security-notice {
    background: var(--warning-100);
    border: 1px solid var(--warning-500);
    border-radius: 6px;
    padding: 8px 6px;
    margin-bottom: 4px;
    font-size: 9px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .security-notice-icon {
    font-size: 14px;
  }
  
  .security-notice-text {
    color: var(--neutral-700);
  }
  
  .security-notice-text strong {
    color: var(--neutral-900);
  }

  /* ============================================
     Typography
     ============================================ */
  .title-large {
    font-size: 28px;
    font-weight: 700;
    color: var(--primary-900);
    line-height: 1.2;
    margin-bottom: 8px;
  }
  
  .title-medium {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-900);
    margin-bottom: 12px;
  }
  
  .title-small {
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-900);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .subtitle {
    font-size: 14px;
    color: var(--neutral-600);
    font-weight: 400;
  }
  
  .section-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--primary-700);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 2px solid var(--primary-500);
  }

  /* ============================================
     Cards & Boxes
     ============================================ */
  .card {
    background: var(--neutral-50);
    border: 1px solid var(--neutral-200);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
  }
  
  .card-primary {
    background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%);
    color: white;
    border: none;
  }
  
  .card-highlight {
    background: var(--primary-50);
    border-color: var(--primary-300);
  }
  
  .card-warning {
    background: var(--warning-100);
    border-color: var(--warning-500);
  }
  
  .card-success {
    background: var(--success-100);
    border-color: var(--success-500);
  }

  /* ============================================
     Contract Identifier Box
     ============================================ */
  .contract-id-box {
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%);
    color: white;
    border-radius: 12px;
    padding: 24px;
    margin: 20px 0;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  /* Decorative watermark (Zenland mark) cropped by the blue box */
  .contract-id-watermark {
    position: absolute;
    top: -25px;
    right: -10px;
    height: 190px;
    width: 190px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.75);
    opacity: 0.18;
    pointer-events: none;
    z-index: 0;
  }

  .contract-id-watermark svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* Ensure content is above watermark */
  .contract-id-box > :not(.contract-id-watermark) {
    position: relative;
    z-index: 1;
  }
  
  .contract-id-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.9;
    margin-bottom: 8px;
  }
  
  .contract-id-value {
    font-size: 12px;
    font-family: 'Courier New', monospace;
    word-break: break-all;
    background: rgba(255,255,255,0.15);
    padding: 10px 14px;
    border-radius: 6px;
    margin-bottom: 12px;
  }
  
  .contract-meta {
    display: flex;
    justify-content: center;
    gap: 24px;
    font-size: 11px;
    opacity: 0.9;
  }

  /* ============================================
     Party Cards
     ============================================ */
  .party-card {
    background: white;
    border: 1px solid var(--neutral-200);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
  }
  
  .party-header {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 5px;
  }
  
  .party-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--primary-100);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
  
  .party-role {
    font-size: 12px;
    font-weight: 600;
    color: var(--primary-700);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .party-status {
    font-size: 10px;
    color: var(--neutral-500);
  }
  
  .party-address {
    font-size: 10px;
    font-family: 'Courier New', monospace;
    color: var(--neutral-700);
    background: var(--neutral-100);
    padding: 8px 10px;
    border-radius: 4px;
    word-break: break-all;
  }

  /* ============================================
     Agent Card (Special)
     ============================================ */
  .agent-card {
    background: var(--primary-50);
    border: 1px solid var(--primary-200);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
  }
  
  .agent-card.locked {
    background: var(--neutral-100);
    border-color: var(--neutral-300);
  }
  
  .agent-card .party-icon {
    background: var(--primary-200);
  }
  
  .agent-card.locked .party-icon {
    background: var(--neutral-200);
  }

  /* ============================================
     Transaction Details
     ============================================ */
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid var(--neutral-100);
    font-size: 11px;
  }
  
  .detail-row:last-child {
    border-bottom: none;
  }
  
  .detail-label {
    color: var(--neutral-600);
  }
  
  .detail-value {
    font-weight: 600;
    color: var(--neutral-900);
    font-family: 'Courier New', monospace;
  }
  
  .detail-value.amount {
    font-size: 14px;
    color: var(--primary-700);
  }

  /* ============================================
     Deadline Box
     ============================================ */
  .deadline-box {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%);
    color: white;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
  }
  
  .deadline-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }
  
  .deadline-icon {
    font-size: 20px;
  }
  
  .deadline-title {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .deadline-text {
    font-size: 11px;
    line-height: 1.5;
    opacity: 0.95;
  }
  
  .deadline-date {
    font-size: 14px;
    font-weight: 700;
    margin: 8px 0;
  }

  /* ============================================
     Terms Section
     ============================================ */
  .terms-box {
    background: white;
    border: 1px solid var(--neutral-200);
    border-radius: 8px;
    padding: 16px;
    /* Allow terms to flow naturally across pages */
    max-height: none;
    overflow: visible;
  }

  /* Better pagination behavior for markdown blocks */
  .markdown-content h1,
  .markdown-content h2,
  .markdown-content h3,
  .markdown-content h4,
  .markdown-content h5,
  .markdown-content h6,
  .markdown-content p,
  .markdown-content ul,
  .markdown-content ol {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  
  .markdown-content {
    font-size: 11px;
    line-height: 1.6;
    color: var(--neutral-700);
  }
  
  .markdown-content h1 {
    font-size: 16px;
    font-weight: 700;
    color: var(--neutral-900);
    margin: 16px 0 8px 0;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--neutral-200);
  }
  
  .markdown-content h1:first-child {
    margin-top: 0;
  }
  
  .markdown-content h2 {
    font-size: 14px;
    font-weight: 600;
    color: var(--neutral-800);
    margin: 14px 0 6px 0;
  }
  
  .markdown-content h3, 
  .markdown-content h4,
  .markdown-content h5,
  .markdown-content h6 {
    font-size: 12px;
    font-weight: 600;
    color: var(--neutral-800);
    margin: 12px 0 4px 0;
  }
  
  .markdown-content p {
    margin: 8px 0;
  }
  
  .markdown-content ul, 
  .markdown-content ol {
    margin: 8px 0;
    padding-left: 20px;
  }
  
  .markdown-content li {
    margin: 4px 0;
  }
  
  .markdown-content strong {
    font-weight: 600;
    color: var(--neutral-900);
  }
  
  .markdown-content em {
    font-style: italic;
  }
  
  .markdown-content code {
    background: var(--neutral-100);
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 10px;
  }
  
  .terms-empty {
    color: var(--neutral-400);
    font-style: italic;
  }

  /* ============================================
     Flow Diagram
     ============================================ */
  .flow-container {
    background: var(--neutral-50);
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
  }
  
  .flow-steps {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .flow-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
  }
  
  .flow-step-number {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--primary-500);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 6px;
  }
  
  .flow-step-label {
    font-size: 9px;
    font-weight: 600;
    color: var(--neutral-700);
    text-transform: uppercase;
  }
  
  .flow-arrow {
    color: var(--primary-400);
    font-size: 18px;
    margin: 0 4px;
  }

  /* ============================================
     QR Section
     ============================================ */
  .qr-section {
    display: flex;
    align-items: center;
    gap: 16px;
    background: var(--neutral-50);
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
  }
  
  .qr-code {
    width: 100px;
    height: 100px;
    background: white;
    border-radius: 8px;
    padding: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .qr-code img {
    width: 100%;
    height: 100%;
  }
  
  .qr-content h4 {
    font-size: 12px;
    font-weight: 700;
    color: var(--primary-700);
    margin-bottom: 4px;
  }
  
  .qr-content p {
    font-size: 10px;
    color: var(--neutral-600);
    margin-bottom: 8px;
  }
  
  .qr-url {
    font-size: 10px;
    font-family: 'Courier New', monospace;
    color: var(--primary-600);
    background: white;
    padding: 6px 10px;
    border-radius: 4px;
    word-break: break-all;
  }

  /* ============================================
     Action Box (Accept Contract)
     ============================================ */
  .action-box {
    background: linear-gradient(135deg, var(--success-500) 0%, #059669 100%);
    color: white;
    border-radius: 12px;
    padding: 24px;
    margin: 16px 0;
  }
  
  .action-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .action-icon {
    font-size: 28px;
  }
  
  .action-title {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .action-content {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .action-qr {
    width: 90px;
    height: 90px;
    background: white;
    border-radius: 8px;
    padding: 6px;
  }
  
  .action-qr img {
    width: 100%;
    height: 100%;
  }
  
  .action-details {
    flex: 1;
  }
  
  .action-url {
    font-size: 10px;
    font-family: 'Courier New', monospace;
    background: rgba(255,255,255,0.2);
    padding: 8px 12px;
    border-radius: 4px;
    margin-bottom: 10px;
    word-break: break-all;
  }
  
  .action-deadline {
    font-size: 11px;
    opacity: 0.9;
  }
  
  .action-deadline strong {
    display: block;
    font-size: 14px;
    margin-top: 2px;
  }

  /* ============================================
     Verification Box
     ============================================ */
  .verify-box {
    background: var(--primary-50);
    border: 2px solid var(--primary-300);
    border-radius: 12px;
    padding: 20px;
    margin: 16px 0;
  }
  
  .verify-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }
  
  .verify-icon {
    font-size: 24px;
    color: var(--primary-600);
  }
  
  .verify-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--primary-800);
    text-transform: uppercase;
  }
  
  .verify-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .verify-qr {
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 8px;
    padding: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .verify-qr img {
    width: 100%;
    height: 100%;
  }
  
  .verify-text {
    flex: 1;
    font-size: 11px;
    color: var(--neutral-700);
    line-height: 1.6;
  }
  
  .verify-list {
    margin: 8px 0;
    padding-left: 0;
    list-style: none;
  }
  
  .verify-list li {
    padding: 3px 0;
    padding-left: 20px;
    position: relative;
  }
  
  .verify-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--success-500);
    font-weight: bold;
  }
  
  .verify-url {
    font-size: 10px;
    font-family: 'Courier New', monospace;
    color: var(--primary-600);
    background: white;
    padding: 8px 12px;
    border-radius: 4px;
    margin-top: 10px;
    word-break: break-all;
  }

  /* ============================================
     Explanation Box
     ============================================ */
  .explanation-box {
    background: white;
    border-left: 4px solid var(--primary-500);
    padding: 16px;
    margin: 16px 0;
  }
  
  .explanation-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--primary-700);
    margin-bottom: 8px;
  }
  
  .explanation-text {
    font-size: 11px;
    color: var(--neutral-600);
    line-height: 1.6;
  }
  
  .explanation-list {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  .explanation-list li {
    margin: 6px 0;
    color: var(--neutral-700);
  }

  /* ============================================
     Two Column Layout
     ============================================ */
  .two-columns {
    display: flex;
    gap: 16px;
  }
  
  .two-columns > * {
    flex: 1;
  }

  /* ============================================
     Utilities
     ============================================ */
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .mb-0 { margin-bottom: 0; }
  .mb-8 { margin-bottom: 8px; }
  .mb-16 { margin-bottom: 16px; }
  .mt-16 { margin-top: 16px; }
  .mt-auto { margin-top: auto; }
`;
