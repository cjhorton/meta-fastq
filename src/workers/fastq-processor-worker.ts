import type { FastqResult } from "@/types/fastq-result.ts";

export interface WorkerMessage {
    file: File
}

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
    const file: File = e.data.file;

    await Promise.resolve();

    const result = createResult(file);
    self.postMessage(result);
}

function createResult(file: File): FastqResult {
    return {
        file: file,
        status: 'Done',
    };
}