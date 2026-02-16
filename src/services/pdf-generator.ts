/**
 * PDF Generator Service
 * 
 * Generates high-quality PDFs from HTML templates using Puppeteer.
 * Uses browser pooling for fast generation (~500ms-1.5s per PDF).
 */

import { browserPool } from './browser-pool.js';
import { generateEscrowTemplate, type EscrowData } from '../templates/escrow-template.js';
import { embedEscrowPdfMetadata } from '../security/pdf-embed.js';
import { buildUnsignedEscrowPdfMetadataV1, signEscrowPdfMetadataV1 } from '../security/escrow-metadata.js';
import type { Hex } from 'viem';

export interface GeneratePdfOptions {
  format?: 'A4' | 'Letter';
  landscape?: boolean;
  printBackground?: boolean;
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

const DEFAULT_OPTIONS: GeneratePdfOptions = {
  format: 'A4',
  landscape: false, // Portrait for 4-page layout
  printBackground: true, // Important for gradients and colors!
  margin: {
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
  },
};

/**
 * Generate a PDF from HTML content
 */
export async function generatePdfFromHtml(
  html: string,
  options: GeneratePdfOptions = {}
): Promise<Buffer> {
  const startTime = Date.now();
  const page = await browserPool.getPage();
  
  try {
    // Set content
    // Using 'domcontentloaded' instead of 'networkidle0' since all assets
    // (QR codes, fonts, etc.) are embedded as inline base64 data URLs.
    // This significantly speeds up PDF generation (saves ~5-15s on low-memory servers).
    await page.setContent(html, {
      waitUntil: 'domcontentloaded',
    });

    // Merge options
    const pdfOptions = { ...DEFAULT_OPTIONS, ...options };

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: pdfOptions.format,
      landscape: pdfOptions.landscape,
      printBackground: pdfOptions.printBackground,
      margin: pdfOptions.margin,
      preferCSSPageSize: true,
    });

    const duration = Date.now() - startTime;
    console.log(`📄 PDF generated in ${duration}ms`);

    return Buffer.from(pdfBuffer);
  } finally {
    await browserPool.releasePage(page);
  }
}

/**
 * Generate an Escrow Agreement PDF
 * 
 * Creates a professional 4-page PDF document with:
 * - Cover & Contract Summary
 * - Parties & Transaction Details
 * - Terms & How It Works
 * - Actions & Verification
 */
export async function generateEscrowPdf(data: EscrowData): Promise<Buffer> {
  console.log(`📝 Generating escrow PDF for contract ${data.escrowAddress}`);
  
  // Generate HTML from template
  const html = await generateEscrowTemplate(data);
  
  // Generate PDF in portrait mode
  const rawPdf = await generatePdfFromHtml(html, {
    landscape: false, // Portrait for 4-page document
    printBackground: true, // Important for gradients and colors
  });

  // Post-process: embed signed metadata (tamper-evident)
  const privateKey = process.env.PDF_SIGNING_PRIVATE_KEY as Hex | undefined;
  if (!privateKey) {
    // We intentionally fail fast in production if signing is expected.
    // This also prevents generating unsigned PDFs by accident.
    throw new Error('PDF_SIGNING_PRIVATE_KEY is not set');
  }

  const unsigned = buildUnsignedEscrowPdfMetadataV1(data);
  const envelope = await signEscrowPdfMetadataV1(unsigned, privateKey, {
    kid: process.env.PDF_SIGNING_KEY_ID,
  });

  const finalBytes = await embedEscrowPdfMetadata(rawPdf, envelope, {
    includeAttachment: true,
    includeWatermark: true,
  });

  return Buffer.from(finalBytes);
}

/**
 * Health check - verify PDF generation is working
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const testHtml = '<html><body><h1>Test</h1></body></html>';
    const pdf = await generatePdfFromHtml(testHtml);
    return pdf.length > 0;
  } catch {
    return false;
  }
}
