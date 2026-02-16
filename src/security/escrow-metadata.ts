import type { Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import type { EscrowData } from '../templates/types.js';
import { stringifyCanonicalJson, type JsonValue } from './canonical-json.js';

export const ZENLAND_ESCROW_PDF_SCHEMA_V1 = 'zenland.escrow_pdf.v1' as const;

export interface ZenlandEscrowPdfUnsignedMetadataV1 {
  schema: typeof ZENLAND_ESCROW_PDF_SCHEMA_V1;
  createdAt: number;
  escrow: {
    escrowAddress: string;
    chainId: number;
    network: string;
    isLocked: boolean;
    buyer: string;
    seller: string;
    agent: string | null;
    token: {
      address: string;
      symbol: string;
    };
    amount: string;
    timeouts: {
      buyerProtectionTime: number;
      sellerAcceptTime: number;
      agentResponseTime: number;
    };
  };
}

export interface ZenlandEscrowPdfSignature {
  alg: 'secp256k1';
  scheme: 'eip191';
  kid?: string;
  signer: string;
  sig: Hex;
}

export interface ZenlandEscrowPdfEnvelopeV1 extends ZenlandEscrowPdfUnsignedMetadataV1 {
  signing: ZenlandEscrowPdfSignature;
}

export interface SignEscrowPdfMetadataOptions {
  /**
   * Optional key id. Useful for future key rotation; not security-critical.
   */
  kid?: string;
}

const SEVEN_DAYS = 7 * 24 * 60 * 60;

export function buildUnsignedEscrowPdfMetadataV1(data: EscrowData): ZenlandEscrowPdfUnsignedMetadataV1 {
  return {
    schema: ZENLAND_ESCROW_PDF_SCHEMA_V1,
    createdAt: Math.floor(Date.now() / 1000),
    escrow: {
      escrowAddress: data.escrowAddress,
      chainId: data.chainId,
      network: data.network,
      isLocked: data.isLocked,
      buyer: data.buyerAddress,
      seller: data.sellerAddress,
      agent: data.agentAddress ?? null,
      token: {
        address: data.tokenAddress,
        symbol: data.tokenSymbol,
      },
      amount: data.amount,
      timeouts: {
        buyerProtectionTime: data.buyerProtectionTime,
        sellerAcceptTime: data.sellerAcceptTime ?? SEVEN_DAYS,
        agentResponseTime: data.agentResponseTime ?? SEVEN_DAYS,
      },
    },
  };
}

/**
 * Returns the deterministic message string that is signed.
 */
export function escrowPdfMetadataSigningMessage(unsigned: ZenlandEscrowPdfUnsignedMetadataV1): string {
  // We sign a canonical JSON string of the unsigned metadata.
  // IMPORTANT: This must remain stable; any change will break verification.
  return stringifyCanonicalJson(unsigned as unknown as JsonValue);
}

export async function signEscrowPdfMetadataV1(
  unsigned: ZenlandEscrowPdfUnsignedMetadataV1,
  privateKey: Hex,
  options: SignEscrowPdfMetadataOptions = {}
): Promise<ZenlandEscrowPdfEnvelopeV1> {
  const account = privateKeyToAccount(privateKey);
  const message = escrowPdfMetadataSigningMessage(unsigned);
  const sig = await account.signMessage({ message });

  return {
    ...unsigned,
    signing: {
      alg: 'secp256k1',
      scheme: 'eip191',
      kid: options.kid,
      signer: account.address,
      sig,
    },
  };
}

// Base64url helpers (no padding)
export function base64UrlEncodeUtf8(input: string): string {
  const b64 = Buffer.from(input, 'utf8').toString('base64');
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
