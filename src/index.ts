/**
 * PDF Service with Puppeteer
 * 
 * A fast, high-quality PDF generation service using Puppeteer + browser pooling.
 * Generates beautiful PDFs with full CSS support (gradients, shadows, etc.)
 */

// Load environment variables from .env (local dev) if present.
// Safe in production too (it just won't find a file unless provided).
import 'dotenv/config';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { browserPool } from './services/browser-pool.js';

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { generateEscrowPdf, healthCheck } from './services/pdf-generator.js';
import type { EscrowData } from './templates/types.js';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json({ limit: '10mb' }));

// NOTE: CORS headers are handled by Nginx in production (see deploy/nginx/conf.d/pdf.zen.land.conf)
// Do NOT add CORS headers here to avoid duplicate header issues

// Serve static landing page
app.use(express.static(path.join(__dirname, 'public')));

// =============================================
// Request Body Interface (from interface)
// =============================================

interface GeneratePdfRequestBody {
  buyerAddress: string;
  sellerAddress: string;
  agentAddress: string | null;
  tokenSymbol: string;
  tokenAddress: string;
  tokenDecimals?: number;
  amount: string;
  buyerProtectionTime: number;
  sellerAcceptTime?: number;
  agentResponseTime?: number;
  terms: string;
  escrowAddress: string;
  creationFee: string;
  assignmentFee: string;
  isLocked: boolean;
  language?: 'en' | 'ru' | 'es' | 'zh';
  createdAt?: number;
  chainId: number;
  network: string;
}

// =============================================
// Routes
// =============================================

/**
 * Health check endpoint
 */
app.get('/health', async (req, res) => {
  const browserHealthy = browserPool.isHealthy();
  const pdfWorking = await healthCheck();
  
  res.json({
    status: browserHealthy && pdfWorking ? 'healthy' : 'degraded',
    browser: browserHealthy ? 'connected' : 'disconnected',
    pdfGeneration: pdfWorking ? 'working' : 'failed',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Generate Escrow Agreement PDF
 * 
 * POST /api/generate
 * Body: GeneratePdfRequestBody
 * Response: PDF binary
 */
app.post('/api/generate', async (req, res) => {
  try {
    const body: GeneratePdfRequestBody = req.body;
    
    // Validate required fields
    if (!body.escrowAddress || !body.buyerAddress || !body.sellerAddress) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['escrowAddress', 'buyerAddress', 'sellerAddress'],
      });
    }

    // Map request body to EscrowData interface
    const escrowData: EscrowData = {
      escrowAddress: body.escrowAddress,
      network: body.network || 'Unknown Network',
      chainId: body.chainId || 0,
      buyerAddress: body.buyerAddress,
      sellerAddress: body.sellerAddress,
      agentAddress: body.agentAddress,
      amount: body.amount || '0',
      tokenSymbol: body.tokenSymbol || 'USDC',
      tokenAddress: body.tokenAddress || '0x0000000000000000000000000000000000000000',
      tokenDecimals: body.tokenDecimals ?? 6,
      creationFee: body.creationFee || '0',
      assignmentFee: body.assignmentFee || '0',
      terms: body.terms || '',
      isLocked: body.isLocked ?? false,
      createdAt: body.createdAt || Math.floor(Date.now() / 1000),
      buyerProtectionTime: body.buyerProtectionTime || 7 * 24 * 60 * 60, // 7 days default
      sellerAcceptTime: body.sellerAcceptTime || 7 * 24 * 60 * 60, // 7 days default
      agentResponseTime: body.agentResponseTime || 7 * 24 * 60 * 60, // 7 days default
      language: body.language || 'en',
    };

    // Generate PDF
    const startTime = Date.now();
    const pdfBuffer = await generateEscrowPdf(escrowData);
    const duration = Date.now() - startTime;

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="escrow-${escrowData.escrowAddress.slice(0, 10)}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('X-Generation-Time-Ms', duration.toString());

    // Send PDF
    res.send(pdfBuffer);
    
    console.log(`✅ Escrow PDF generated in ${duration}ms (${pdfBuffer.length} bytes) for ${escrowData.escrowAddress}`);
  } catch (error) {
    console.error('❌ PDF generation error:', error);
    res.status(500).json({
      error: 'Failed to generate PDF',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Preview endpoint - returns HTML instead of PDF (for debugging)
 */
app.post('/preview/escrow', async (req, res) => {
  try {
    const { generateEscrowTemplate } = await import('./templates/escrow-template.js');
    const body = req.body;
    
    // Map request body to EscrowData
    const escrowData: EscrowData = {
      escrowAddress: body.escrowAddress || '0xFf6172C849680554aEA56FF9d4F7FB8a8B3644b8',
      network: body.network || 'Ethereum Sepolia',
      chainId: body.chainId || 11155111,
      buyerAddress: body.buyerAddress || '0x7Ee4568eF287FABD1dd3B9c40523Bb9C49BF1Ae9',
      sellerAddress: body.sellerAddress || '0x983332bb0b689ed97907f658525d19f4d876d96c',
      agentAddress: body.agentAddress || '0x41bfbe4153f247c8629ab528b41b9eb011773b2c',
      amount: body.amount || '1',
      tokenSymbol: body.tokenSymbol || 'USDC',
      tokenAddress: body.tokenAddress || '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
      tokenDecimals: body.tokenDecimals ?? 6,
      creationFee: body.creationFee || '500000',
      assignmentFee: body.assignmentFee || '50000',
      terms: body.terms || '# Sample Terms\n\nThis is a sample escrow agreement.\n\n## Deliverables\n\n- Item 1\n- Item 2\n\n**Important:** All items must be delivered within the specified timeframe.',
      isLocked: body.isLocked ?? false,
      createdAt: body.createdAt || Math.floor(Date.now() / 1000),
      buyerProtectionTime: body.buyerProtectionTime || 14 * 24 * 60 * 60, // 14 days
      sellerAcceptTime: body.sellerAcceptTime || 7 * 24 * 60 * 60, // 7 days
      agentResponseTime: body.agentResponseTime || 7 * 24 * 60 * 60, // 7 days
      language: body.language || 'en',
    };

    const html = await generateEscrowTemplate(escrowData);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Preview error:', error);
    res.status(500).json({ error: 'Failed to generate preview' });
  }
});

// =============================================
// Server Startup
// =============================================

async function startServer() {
  try {
    // Pre-warm browser pool
    console.log('🔥 Warming up browser pool...');
    await browserPool.init();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   🚀 PDF Service (Puppeteer) v2.0 running on port ${PORT}           ║
║                                                                   ║
║   Endpoints:                                                      ║
║   • GET  /health           - Health check                         ║
║   • POST /api/generate     - Generate escrow PDF                  ║
║   • POST /preview/escrow   - Preview HTML (debugging)             ║
║                                                                   ║
║   Features:                                                       ║
║   ✅ Professional 4-page portrait layout                          ║
║   ✅ Zenland Blue design system                                   ║
║   ✅ Full markdown support for terms                              ║
║   ✅ QR codes for accept/verify/view                              ║
║   ✅ Anti-phishing security notices                               ║
║   ✅ Browser pooling for fast generation                          ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
