import type { FastqResult } from "@/types/fastq-result.ts";
import type { MessageFromWorker, MessageToWorker, ResultMessage } from "@/types/fastq-worker-messages.ts";
import { isGzipFile } from "@/utils/file-utils.ts";
import { streamGunzip, streamPlainText } from "@/utils/file-streamers.ts";
import type { FastqRead } from "@/types/fastq-types.ts";
import { isValidFastqRead } from "@/utils/fastq-validator.ts";

self.onmessage = async (e: MessageEvent<MessageToWorker>) => {
    const {file} = e.data;

    try {
        const isGzipped = await isGzipFile(file);
        const stream = isGzipped ? streamGunzip(file) : streamPlainText(file);

        const firstRead = await readFirstFastqRead(stream);

        if (!firstRead) {
            self.postMessage({
                type: 'error',
                fileName: file.name,
                error: 'No reads found'
            } as MessageFromWorker);
            return;
        }

        if (!isValidFastqRead(firstRead)) {
            self.postMessage({
                type: 'error',
                fileName: file.name,
                error: 'Invalid read structure'
            } as MessageFromWorker);
            return;
        }

        const result = processFastqRead(file, firstRead);
        const message = createResultMessage(result);

        self.postMessage(message);

    } catch (error) {
        self.postMessage({
            type: 'error',
            fileName: file.name,
            error: (error as Error).message
        } as MessageFromWorker);
    }
};

function createResult(file: File): FastqResult {
    return {
        file: file,
        status: 'Done',
        platform: 'Illumina'
    };
}

function createResultMessage(result: FastqResult): ResultMessage {
    return {
        type: 'result',
        result: result,
    };
}

async function readFirstFastqRead(stream: AsyncGenerator<string>): Promise<FastqRead | null> {
    const firstRead: string[] = [];

    for await (const chunk of stream) {
        const lines = chunk.split('\n').map(l => l.trim()).filter(Boolean);

        for (const line of lines) {
            firstRead.push(line);

            if (firstRead.length === 4) break;
        }

        if (firstRead.length === 4) break;
    }

    return firstRead.length === 4 ? firstRead as FastqRead : null;
}

function processFastqRead(file: File, firstRead: FastqRead): FastqResult {
    console.log('Processing file -', file.name);
    console.log('first read -', firstRead);

    return createResult(file);
}

