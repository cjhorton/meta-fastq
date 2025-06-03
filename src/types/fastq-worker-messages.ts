import type { FastqResult } from "@/types/fastq-result.ts";

export interface ResultMessage {
    type: 'result';
    result: FastqResult;
}

export interface ErrorMessage {
    type: 'error';
    fileName: string;
    error: string;
}

export type MessageFromWorker = ResultMessage | ErrorMessage;

export interface MessageToWorker {
    file: File;
}
