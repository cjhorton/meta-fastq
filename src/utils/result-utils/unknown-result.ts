import type { FastqResult, ProcessingStatus } from "@/types/fastq-result.ts";

export const createUnknownResult = (file: File, status: ProcessingStatus): FastqResult => {
    return {
        file: file,
        platform: "Unknown",
        status: status
    } as FastqResult;
};