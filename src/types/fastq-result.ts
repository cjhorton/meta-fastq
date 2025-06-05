import type { PlatformType } from "@/types/platform.ts";

export const ProcessingStatusValues = {
    Pending: 'Pending',
    Done: 'Done',
    Error: 'Error',
} as const;

export type ProcessingStatus = typeof ProcessingStatusValues[keyof typeof ProcessingStatusValues];

export interface FastqResult {
    file: File;
    status: ProcessingStatus;
    platform: PlatformType;
}