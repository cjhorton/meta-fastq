import { useEffect, useState } from "react";
import type { FastqResult } from "@/types/fastq-result.ts";
import type { FastqProcessingStatus, FastqProcessingUpdate } from "@/types/fastq-processing-update.ts";

interface Props {
    files: File[];
    onProcessingUpdate: (update: FastqProcessingUpdate) => void;
}

export const FastqProcessor = ({files, onProcessingUpdate}: Props) => {
    const [status, setStatus] = useState<FastqProcessingStatus>('initial')

    useEffect(() => {
        if (files.length === 0) {
            setStatus('initial');
            return;
        }

        if (status === 'initial') {
            const results: FastqResult[] = files.map(f => ({file: f, status: 'Pending'}));
            onProcessingUpdate({
                status: 'processing',
                results,
            });
            setStatus('processing');
        }

    }, [files, onProcessingUpdate, status]);

    useEffect(() => {
        if (status !== 'processing') return;

        const timer = setTimeout(() => {
            const results: FastqResult[] = files.map(f => ({file: f, status: 'Done'}));
            onProcessingUpdate({
                status: 'complete',
                results,
            });
            setStatus('complete');
        }, 2000);

        return () => {
            clearTimeout(timer);
        }
    }, [files, onProcessingUpdate, status]);

    return null;
}