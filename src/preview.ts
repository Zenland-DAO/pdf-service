/**
 * Preview Script
 * 
 * Generates a sample PDF and saves it to disk for preview.
 * Also opens the HTML in the default browser for quick iteration.
 * 
 * Usage: npm run preview
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { browserPool } from './services/browser-pool.js';
import { generateEscrowPdf } from './services/pdf-generator.js';
import { generateEscrowTemplate, type EscrowData } from './templates/escrow-template.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample data that mimics your target design
const sampleData: EscrowData = {
  // Contract info
  escrowAddress: '0xdef456789abcdef123456789abcdef123456789a',
  network: 'Ethereum Mainnet',
  chainId: 1,
  
  // Parties
  buyerAddress: '0x1234567890abcdef1234567890abcdef12345678',
  sellerAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
  agentAddress: null, // Automated
  
  // Transaction
  amount: '10.5',
  tokenSymbol: 'ETH',
  tokenAddress: '0x0000000000000000000000000000000000000000',
  creationFee: '0.01',
  assignmentFee: '0.005',
  
  // Terms
  terms: `This agreement is for the sale of a digital asset (NFT Collection).

**Delivery Terms:**
- Seller will transfer the NFT within 48 hours of contract acceptance
- NFT will be sent to the buyer's wallet address specified above

**Quality Guarantee:**
- The NFT must match the description provided
- All metadata must be intact and verifiable

**Dispute Resolution:**
- Any disputes will be resolved through the Zenland arbitration process`,
  isLocked: false,
  
  // Timestamps
  createdAt: Math.floor(Date.now() / 1000),
  buyerProtectionTime: 7 * 24 * 60 * 60, // 7 days
  sellerAcceptTime: 3 * 24 * 60 * 60, // 3 days
  
  // Language
  language: 'en',
};

async function main() {
  console.log('🎨 Generating preview...\n');

  // For local preview runs, use a deterministic demo signing key if none is provided.
  // IMPORTANT: never use this in production.
  process.env.PDF_SIGNING_PRIVATE_KEY ||= `0x${'11'.repeat(32)}`;
  process.env.PDF_SIGNING_KEY_ID ||= 'dev-preview';
  
  const outputDir = path.join(__dirname, '..', 'output');
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 1. Generate and save HTML for browser preview
  console.log('📝 Generating HTML preview...');
  const html = await generateEscrowTemplate(sampleData);
  const htmlPath = path.join(outputDir, 'preview.html');
  fs.writeFileSync(htmlPath, html);
  console.log(`   ✅ HTML saved to: ${htmlPath}`);
  
  // 2. Generate and save PDF
  console.log('\n📄 Generating PDF...');
  const startTime = Date.now();
  const pdfBuffer = await generateEscrowPdf(sampleData);
  const duration = Date.now() - startTime;
  
  const pdfPath = path.join(outputDir, 'preview.pdf');
  fs.writeFileSync(pdfPath, pdfBuffer);
  console.log(`   ✅ PDF saved to: ${pdfPath}`);
  console.log(`   ⏱️  Generation time: ${duration}ms`);
  console.log(`   📦 File size: ${(pdfBuffer.length / 1024).toFixed(1)} KB`);
  
  // Cleanup
  await browserPool.close();
  
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ✨ Preview generated successfully!                      ║
║                                                           ║
║   Open these files to see the result:                     ║
║                                                           ║
║   📄 PDF:  ${pdfPath}
║   🌐 HTML: ${htmlPath}
║                                                           ║
║   Tip: Open the HTML in a browser for quick iteration,    ║
║   then generate the PDF to see the final result.          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
  
  // Try to open HTML in browser (works on most systems)
  const { exec } = await import('child_process');
  const openCommand = process.platform === 'darwin' ? 'open' : 
                      process.platform === 'win32' ? 'start' : 'xdg-open';
  
  exec(`${openCommand} "${htmlPath}"`, (error) => {
    if (error) {
      console.log('💡 Open the HTML file manually in your browser to preview.');
    }
  });
}

main().catch(console.error);
