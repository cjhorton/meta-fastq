import { BASES_LINE, type FastqRead, HEADER_LINE, PLUS_LINE, QUALITY_LINE } from "../types/fastq-types.ts";

const FASTQ_BASES_REGEX = /^[ACGTN]+$/i;
const FASTQ_QUALITY_REGEX = /^[\x21-\x7E]+$/;

export function isValidFastqRead(read: FastqRead): boolean {
    const header = read[HEADER_LINE];
    const sequence = read[BASES_LINE];
    const plus = read[PLUS_LINE];
    const quality = read[QUALITY_LINE];

    if (!header.startsWith('@')) return false;
    if (!plus.startsWith('+') || plus.length > 1) return false;
    if (sequence.length < 1 || quality.length < 1) return false;
    if (sequence.length !== quality.length) return false;

    if (!FASTQ_BASES_REGEX.test(sequence)) return false;

    return FASTQ_QUALITY_REGEX.test(quality);
}