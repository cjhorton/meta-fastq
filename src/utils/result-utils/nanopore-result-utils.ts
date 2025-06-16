import { type FastqRead, HEADER_LINE } from "../../types/fastq-types.ts";
import { parseNanoporeHeader } from "../../utils/header-utils/nanopore-header-utils.ts";
import type { FastqResult } from "@/types/fastq-result.ts";
import { type InstrumentType, type NanoporeInstrumentType, NanoporeInstrumentValues, } from "@/types/instruments.ts";
import { NanoporeFlowCellIdMappings } from "@/types/flow-cell-id-mappings.ts";
import { type FlowCellType, type NanoporeFlowCellType, NanoporeFlowCellValues } from "@/types/flow-cells.ts";

interface InstrumentDeviceInfo<T extends FlowCellType, I = InstrumentType> {
    flowCell: T;
    instruments: I[];
}

export const createNanoporeResult = (file: File, firstRead: FastqRead): FastqResult => {
    const header = parseNanoporeHeader(firstRead[HEADER_LINE]);

    if (!header) {
        return {
            file,
            status: 'Error',
            error: 'Expected Nanopore header',
            platform: 'Unknown'
        };
    }

    const resolvedFlowCellId = header.flowCellId ?? '';

    const {flowCell, instruments} = getNanoporeDeviceInfo(resolvedFlowCellId);

    return {
        file,
        status: 'Done',
        platform: 'Nanopore',
        instrumentTypes: instruments,
        flowCellId: header.flowCellId,
        flowCellType: flowCell,
    };
}

const getNanoporeDeviceInfo = (flowcellId: string): InstrumentDeviceInfo<NanoporeFlowCellType, NanoporeInstrumentType> => {
    for (const mapping of NanoporeFlowCellIdMappings) {
        if (mapping.pattern.test(flowcellId)) {
            return {
                flowCell: mapping.flowCell,
                instruments: mapping.instruments
            };
        }
    }

    return {
        flowCell: NanoporeFlowCellValues.unknown,
        instruments: [NanoporeInstrumentValues.unknownNanopore]
    };
};
