/**
 * Escrow Agreement PDF Template
 * 
 * Generates a professional 4-page PDF document for smart contract escrow agreements.
 * Uses Zenland Blue design system with full CSS support.
 * 
 * Pages:
 * 1. Cover & Contract Summary
 * 2. Parties & Transaction Details
 * 3. Terms & How It Works
 * 4. Actions & Verification
 */

import type { EscrowData } from './types.js';
import { computeDates, generateUrls, generateQRCode } from './utils.js';
import { baseStyles } from './styles.js';
import { generatePage1 } from './page1-cover.js';
import { generatePage2 } from './page2-parties.js';
import { generatePage3 } from './page3-actions.js';
import { generatePage4 } from './page4-terms.js';

// Re-export types for convenience
export type { EscrowData } from './types.js';

/**
 * Generate the complete HTML template for the escrow agreement PDF.
 * 
 * @param data - The escrow contract data
 * @returns HTML string ready for PDF rendering
 */
export async function generateEscrowTemplate(data: EscrowData): Promise<string> {
  // Compute derived values
  const dates = computeDates(data);
  const urls = generateUrls(data.escrowAddress);
  
  // Generate QR codes in parallel
  const [viewQrCode, acceptQrCode, verifyQrCode] = await Promise.all([
    generateQRCode(urls.viewUrl),
    generateQRCode(urls.acceptUrl),
    generateQRCode(urls.verifyUrl),
  ]);

  // Generate each page
  const page1 = generatePage1({ data, dates, urls, viewQrCode });
  const page2 = generatePage2({ data, dates });
  const page3 = generatePage3({ data, dates, urls, acceptQrCode, verifyQrCode  });
  const page4 = generatePage4({ data, dates});

  // Combine into full document
  return `
<!DOCTYPE html>
<html lang="${data.language || 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Contract Escrow Agreement - ${data.escrowAddress}</title>
  <style>
    ${baseStyles}
  </style>
</head>
<body>
  ${page1}
  ${page2}
  ${page3}
  ${page4}
</body>
</html>
  `.trim();
}
