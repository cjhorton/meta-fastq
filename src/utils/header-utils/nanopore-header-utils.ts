import type { NanoporeHeader } from "@/types/fastq-read-headers.ts";

export const parseNanoporeHeader = (header: string): NanoporeHeader | null => {
    if (!match(header)) return null;


    const [readIdPart, ...fieldParts] = header.slice(1).trim().split(' ');
    const fields: Record<string, string> = {};

    for (const part of fieldParts) {
        const [key, ...rest] = part.split('=');
        if (key && rest.length > 0) {
            fields[key] = rest.join('=');
        }
    }

    return createParsedHeader(readIdPart, fields);
}

export const isNanoporePlatform = (header: string): boolean => {
    return match(header);
};

const match = (header: string): boolean => {
    if (!header.startsWith('@')) return false;

    const lower = header.toLowerCase();
    return (
        lower.includes('runid=') &&
        (lower.includes('sampleid=') || lower.includes('sample_id=')) &&
        lower.includes('flow_cell_id=')
    );
};

const createParsedHeader = (readId: string, fields: Record<string, string | undefined>): NanoporeHeader => {
    return {
        readId,
        runId: fields.runid,
        sampleId: fields.sampleid ?? fields.sample_id,
        flowCellId: fields.flow_cell_id,
        protocolGroupId: fields.protocol_group_id,
        channel: fields.ch ? Number(fields.ch) : undefined,
        startTime: fields.start_time,
        basecallModelVersionId: fields.basecall_model_version_id,
        basecallGpu: fields.basecall_gpu,
        barcode: fields.barcode,
        barcodeAlias: fields.barcode_alias,
        parentReadId: fields.parent_read_id,
    };
};