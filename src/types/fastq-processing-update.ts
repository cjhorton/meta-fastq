import type { FastqResult } from "@/types/fastq-result.ts";

export interface FastqProcessingUpdate {
    status: 'processing' | 'complete' | 'error';
    results: FastqResult[];
}