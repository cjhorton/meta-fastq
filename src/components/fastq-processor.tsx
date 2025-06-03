import { useCallback, useEffect, useReducer, useRef } from "react";
import type { FastqProcessingUpdate } from "@/types/fastq-processing-update.ts";
import { fastqProcessingReducer } from "@/reducers/fastq-processing-reducer.ts";
import type { MessageFromWorker } from "@/types/fastq-worker-messages.ts";

interface Props {
    files: File[];
    onProcessingUpdate: (update: FastqProcessingUpdate) => void;
}

export const FastqProcessor = ({files, onProcessingUpdate}: Props) => {
    const [state, dispatch] = useReducer(fastqProcessingReducer, []);
    const workerRef = useRef<Worker | null>(null);
    const fileQueueRef = useRef<File[]>([]);
    const currentIndex = useRef<number>(0);

    const processNextFile = () => {
        const worker = workerRef.current;
        if (!worker) return;

        const queue = fileQueueRef.current;
        const index = currentIndex.current;

        if (index < queue.length) {
            const file = queue[index];
            currentIndex.current++;
            worker.postMessage({file: file});
        }
    };

    const handleWorkerMessage = useCallback((message: MessageFromWorker) => {
        const {type} = message;

        if (type === "result") {
            const {result} = message;
            dispatch({type: "setResult", result});
            processNextFile();
        } else {
            const {fileName, error} = message;
            dispatch({type: "setError", fileName: fileName, error});
            processNextFile();
        }
    }, []);

    useEffect(() => {
        if (files.length === 0) return;

        dispatch({type: 'initialize', files});
        fileQueueRef.current = [...files];
        currentIndex.current = 0;

        const worker = new Worker(new URL('../workers/fastq-processor-worker.ts', import.meta.url), {type: 'module'});

        worker.onmessage = (e: MessageEvent<MessageFromWorker>) => {
            handleWorkerMessage(e.data);
        };

        workerRef.current = worker;

        processNextFile();

        return () => {
            worker.terminate();
        };

    }, [files, handleWorkerMessage]);

    useEffect(() => {
        if (state.length === 0) return;

        const isComplete = state.every(r => r.status === 'Done' || r.status === 'Error');

        onProcessingUpdate({
            status: isComplete ? 'complete' : 'processing',
            results: state,
        });
    }, [state, onProcessingUpdate]);

    return null;
}