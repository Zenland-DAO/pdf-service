import {
  PDFDocument,
  PDFName,
  PDFRawStream,
  PDFDict,
  rgb,
  StandardFonts,
} from 'pdf-lib';
import type { ZenlandEscrowPdfEnvelopeV1 } from './escrow-metadata.js';
import { base64UrlEncodeUtf8 } from './escrow-metadata.js';

export interface EmbedEscrowPdfMetadataOptions {
  /** Also embed invisible watermark on each page */
  includeWatermark?: boolean;
  /** Also embed attachment */
  includeAttachment?: boolean;
}

const DEFAULT_EMBED_OPTIONS: Required<EmbedEscrowPdfMetadataOptions> = {
  includeWatermark: true,
  includeAttachment: true,
};

function buildShortMarker(envelope: ZenlandEscrowPdfEnvelopeV1): string {
  // Short marker for watermarking; not meant to be secret.
  // Using escrowAddress + chainId allows quick identification.
  return `${envelope.schema}:${envelope.escrow.chainId}:${envelope.escrow.escrowAddress}`;
}

function buildInfoSubject(envelope: ZenlandEscrowPdfEnvelopeV1): string {
  const json = JSON.stringify(envelope);
  const payload = base64UrlEncodeUtf8(json);
  // Keep this prefix stable; clients can parse it.
  return `zenland:escrow_pdf:v1:${payload}`;
}

function buildXmpPacket(envelope: ZenlandEscrowPdfEnvelopeV1): string {
  // Minimal XMP packet with a custom zenland namespace.
  // This is XML and may be stripped by aggressive processors, but we also
  // store the same data in other channels.
  const json = JSON.stringify(envelope);
  const payload = base64UrlEncodeUtf8(json);

  // Note: XMP uses RDF; we include a single Description.
  return `<?xpacket begin="\ufeff" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Zenland PDF Service">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description
      rdf:about=""
      xmlns:zenland="https://zen.land/ns/pdf/escrow/1.0/"
      zenland:schema="${envelope.schema}"
      zenland:payload="${payload}" />
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}

function setXmpMetadataLowLevel(pdfDoc: PDFDocument, xmpXml: string): void {
  // PDF spec: XMP is stored in the catalog under /Metadata as a stream with:
  //   /Type /Metadata
  //   /Subtype /XML
  // Some processors are picky about /Length; pdf-lib sets it.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyDoc = pdfDoc as any;
  const catalog = anyDoc.catalog;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const catalogDict: PDFDict | undefined = catalog?.dict;
  if (!catalogDict) return;

  const metadataDict = pdfDoc.context.obj({
    Type: 'Metadata',
    Subtype: 'XML',
  });

  const metadataStream = PDFRawStream.of(metadataDict, Buffer.from(xmpXml, 'utf8'));
  const metadataRef = pdfDoc.context.register(metadataStream);

  catalogDict.set(PDFName.of('Metadata'), metadataRef);
}

/**
 * Embeds signed escrow metadata redundantly into a PDF.
 */
export async function embedEscrowPdfMetadata(
  pdfBytes: Uint8Array,
  envelope: ZenlandEscrowPdfEnvelopeV1,
  options: EmbedEscrowPdfMetadataOptions = {}
): Promise<Uint8Array> {
  const opts = { ...DEFAULT_EMBED_OPTIONS, ...options };
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // 1) Standard Info dictionary fields
  pdfDoc.setTitle('Escrow Agreement');
  pdfDoc.setAuthor('Zenland');
  pdfDoc.setCreator('Zenland PDF Service');
  pdfDoc.setProducer('Zenland PDF Service');
  pdfDoc.setSubject(buildInfoSubject(envelope));
  pdfDoc.setKeywords([
    'zenland',
    'escrow',
    envelope.escrow.network,
    `chainId:${envelope.escrow.chainId}`,
    `escrow:${envelope.escrow.escrowAddress}`,
  ]);

  // 2) XMP metadata
  const xmp = buildXmpPacket(envelope);
  setXmpMetadataLowLevel(pdfDoc, xmp);

  // 3) Watermark (invisible text)
  if (opts.includeWatermark) {
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const marker = `ZENLAND_ESCROW_PDF_V1:${buildShortMarker(envelope)}`;

    for (const page of pages) {
      // Put it slightly off-canvas (negative coords) and fully transparent.
      page.drawText(marker, {
        x: -100,
        y: -100,
        size: 0.1,
        font,
        color: rgb(1, 1, 1),
        opacity: 0,
      });
    }
  }

  // 4) Embedded attachment
  if (opts.includeAttachment) {
    const attachmentName = 'zenland-escrow-metadata.v1.json';
    const attachmentBytes = Buffer.from(JSON.stringify(envelope, null, 2), 'utf8');

    // pdf-lib has attach in recent versions.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const attachFn = (pdfDoc as any).attach as undefined | ((data: Uint8Array, name: string, options?: any) => void);
    if (attachFn) {
      attachFn.call(pdfDoc, attachmentBytes, attachmentName, {
        mimeType: 'application/json',
        description: 'Zenland signed escrow PDF metadata',
        creationDate: new Date(),
        modificationDate: new Date(),
      });
    }
  }

  return await pdfDoc.save();
}
