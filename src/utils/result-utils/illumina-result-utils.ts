import { BASES_LINE, type FastqRead, HEADER_LINE } from "../../types/fastq-types.ts";
import { parseIlluminaHeader } from "../../utils/header-utils/illumina-header-utils.ts";
import type { FastqResult } from "@/types/fastq-result.ts";
import { determineIlluminaInstrument } from "../instrument-detectors.ts";
import { determineIlluminaFlowCell } from "../flow-cell-detectors.ts";

export const createIlluminaResult = (file: File, firstRead: FastqRead): FastqResult => {
    const header = parseIlluminaHeader(firstRead[HEADER_LINE]);

    if (!header) {
        return {
            file,
            status: 'Error',
            error: 'Expected Illumina header',
            platform: 'Unknown'
        };
    }

    const instruments = determineIlluminaInstrument(header.instrument);
    const flowCellType = determineIlluminaFlowCell(header.flowCellId);

    return {
        file,
        status: 'Done',
        platform: 'Illumina',
        instrumentId: header.instrument,
        instrumentTypes: instruments,
        flowCellId: header.flowCellId,
        flowCellType: flowCellType,
        runNumber: header.runNumber,
        cycles: firstRead[BASES_LINE].length,
        indexes: header.index,
        readNumber: header.read
    };
}