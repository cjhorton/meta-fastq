import type { PlatformType } from "@/types/platform.ts";
import type { InstrumentType } from "@/types/instruments.ts";

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
    instrumentId?: string,
    instrumentTypes?: InstrumentType[],
    flowcellId?: string,
    error?: string;
    runNumber?: number,
    cycles?: number,
    indexes?: string
    readNumber?: number
}