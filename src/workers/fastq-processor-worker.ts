import type { FastqResult } from "@/types/fastq-result.ts";
import type { MessageToWorker, ResultMessage } from "@/types/fastq-worker-messages.ts";

function sleep(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time));
}

self.onmessage = async (e: MessageEvent<MessageToWorker>) => {
    const file: File = e.data.file;
    await sleep(1000);

    const result = createResult(file);
    const message = createResultMessage(result);
    self.postMessage(message);
}

function createResult(file: File): FastqResult {
    return {
        file: file,
        status: 'Done',
    };
}

function createResultMessage(result: FastqResult): ResultMessage {
    return {
        type: 'result',
        result: result,
    };
}