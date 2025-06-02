import type { FastqResult } from "@/types/fastq-result.ts";

export type FastqProcessingStatus = 'initial' | 'processing' | 'complete' | 'error';

export interface FastqProcessingUpdate {
    status: FastqProcessingStatus;
    results: FastqResult[];
}