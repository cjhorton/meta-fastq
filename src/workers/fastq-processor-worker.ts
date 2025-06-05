import type { FastqResult } from "@/types/fastq-result.ts";
import type { MessageFromWorker, MessageToWorker, ResultMessage } from "@/types/fastq-worker-messages.ts";
import { isGzipFile } from "../utils/file-utils.ts";
import { streamGunzip, streamPlainText } from "../utils/file-streamers.ts";
import { type FastqRead, HEADER_LINE } from "@/types/fastq-types.ts";
import { isValidFastqRead } from "../utils/fastq-validator.ts";
import { determinePlatform } from "../utils/header-utils/fastq-platform-utils.ts";
import { createIlluminaResult } from "../utils/result-utils/illumina-result-utils.ts";
import { createUnknownResult } from "../utils/result-utils/unknown-result.ts";

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
    const platform = determinePlatform(firstRead[HEADER_LINE]);

    switch (platform) {
        case 'Illumina':
            return createIlluminaResult(file, firstRead);
        default:
            return createUnknownResult(file, 'Done');
    }
}

