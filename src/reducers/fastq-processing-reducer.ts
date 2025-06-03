import type { FastqResult } from "@/types/fastq-result.ts";

export type Action =
    | { type: 'initialize'; files: File[] }
    | { type: 'setResult'; result: FastqResult }
    | { type: 'setError'; fileName: string, error: string };

export function fastqProcessingReducer(state: FastqResult[], action: Action): FastqResult[] {
    switch (action.type) {
        case 'initialize':
            return action.files.map(f => ({file: f, status: 'Pending'}));
        case 'setResult':
            return state.map(r => r.file.name === action.result.file.name ? action.result : r);
        case 'setError':
            return state.map(r => r.file.name === action.fileName ? {...r, status: 'Error'} : r);
        default:
            return state;
    }
}