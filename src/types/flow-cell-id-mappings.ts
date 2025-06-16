import {
    type IlluminaInstrumentType,
    IlluminaInstrumentValues,
    type InstrumentType,
    type NanoporeInstrumentType, NanoporeInstrumentValues, type UnknownInstrumentType, UnknownInstrumentValues
} from "./instruments.ts";
import {
    type FlowCellType,
    type IlluminaFlowCellType,
    IlluminaFlowCellValues,
    type NanoporeFlowCellType, NanoporeFlowCellValues, type UnknownFlowCellType, UnknownFlowCellValues
} from "./flow-cells.ts";

export interface FlowCellIdMapping<T extends FlowCellType, I = InstrumentType> {
    pattern: RegExp;
    flowCell: T;
    instruments: I[];
}

export const IlluminaFlowCellIdMappings: FlowCellIdMapping<IlluminaFlowCellType, IlluminaInstrumentType>[] = [
    { pattern: /^(?:BNT|BRB|BPC|BPG|BPA|BPL|BTR)[A-Z0-9]{5}-[A-Z0-9]{4}$/, flowCell: IlluminaFlowCellValues.standardOutput, instruments: [IlluminaInstrumentValues.iSeq] },
    { pattern: /^000H[A-Z0-9]{5}$/, flowCell: IlluminaFlowCellValues.midOrHighOutput, instruments: [IlluminaInstrumentValues.miniSeq] },
    { pattern: /^[A-Z0-9]{5}AF[A-Z0-9]{2}$/, flowCell: IlluminaFlowCellValues.midOutput, instruments: [IlluminaInstrumentValues.nextSeq] },
    { pattern: /^[A-Z0-9]{5}(?:AG|BG)[A-Z0-9]{2}$/, flowCell: IlluminaFlowCellValues.highOutput, instruments: [IlluminaInstrumentValues.nextSeq] },
    { pattern: /^[A-Z0-9]{7}M5$/, flowCell: IlluminaFlowCellValues.p1OrP2, instruments: [IlluminaInstrumentValues.nextSeq1000_2000] },
    { pattern: /^[A-Z0-9]{7}HV$/, flowCell: IlluminaFlowCellValues.p3, instruments: [IlluminaInstrumentValues.nextSeq1000_2000] },
    { pattern: /^H[A-Z0-9]{4}BGX[XY]$/, flowCell: IlluminaFlowCellValues.highOutput, instruments: [IlluminaInstrumentValues.nextSeq] },
    { pattern: /^[A-Z0-9]{5}BC[A-Z0-9]{2}$/, flowCell: IlluminaFlowCellValues.rapidRunV2, instruments: [IlluminaInstrumentValues.hiSeq2500] },
    { pattern: /^[A-Z0-9]{5}AC[A-Z0-9]{2}$/, flowCell: IlluminaFlowCellValues.trueSeqV3, instruments: [IlluminaInstrumentValues.hiSeq2500] },
    { pattern: /^[A-Z0-9]{5}AN[A-Z0-9]{2}$/, flowCell: IlluminaFlowCellValues.highOutputV3, instruments: [IlluminaInstrumentValues.hiSeq2500] },
    { pattern: /^[A-Z0-9]{5}BB[A-Z0-9]{2}$/, flowCell: IlluminaFlowCellValues.eightLaneV1, instruments: [IlluminaInstrumentValues.hiSeq3000, IlluminaInstrumentValues.hiSeq4000] },
    { pattern: /^[A-Z0-9]{5}(?:AL|CC)[A-Z0-9]{2}$/, flowCell: IlluminaFlowCellValues.eightLane, instruments: [IlluminaInstrumentValues.hiSeqX] },
    { pattern: /^[A-Z0-9]{5}DR[A-Z0-9]{2}$/, flowCell: IlluminaFlowCellValues.spOrS1, instruments: [IlluminaInstrumentValues.novaSeq] },
    { pattern: /^[A-Z0-9]{5}DM[A-Z0-9]{2}$/, flowCell: IlluminaFlowCellValues.s2, instruments: [IlluminaInstrumentValues.novaSeq] },
    { pattern: /^[A-Z0-9]{5}DS[A-Z0-9]{2}$/, flowCell: IlluminaFlowCellValues.s4, instruments: [IlluminaInstrumentValues.novaSeq] },
    { pattern: /^[A-Z0-9]{6}LT3$/, flowCell: IlluminaFlowCellValues.tenB, instruments: [IlluminaInstrumentValues.novaSeqX] },
    { pattern: /^[A-Z0-9]{6}LT4$/, flowCell: IlluminaFlowCellValues.twentyFiveB, instruments: [IlluminaInstrumentValues.novaSeqX] },
    { pattern: /^[A-Z0-9]{6}LT[A-Z0-9]$/, flowCell: IlluminaFlowCellValues.unknown, instruments: [IlluminaInstrumentValues.novaSeqX] },
    { pattern: /^D[A-Z0-9]{4}$/, flowCell: IlluminaFlowCellValues.nano, instruments: [IlluminaInstrumentValues.miSeq] },
    { pattern: /^G[A-Z0-9]{4}$/, flowCell: IlluminaFlowCellValues.micro, instruments: [IlluminaInstrumentValues.miSeq] },
    { pattern: /^A[A-Z0-9]{4}$/, flowCell: IlluminaFlowCellValues.standardV2, instruments: [IlluminaInstrumentValues.miSeq] },
    { pattern: /^[BCJKL][A-Z0-9]{4}$/, flowCell: IlluminaFlowCellValues.standard, instruments: [IlluminaInstrumentValues.miSeq] },
    { pattern: /^.*$/, flowCell: IlluminaFlowCellValues.unknown, instruments: [IlluminaInstrumentValues.unknownIllumina] }
];

export const NanoporeFlowCellIdMappings: FlowCellIdMapping<NanoporeFlowCellType, NanoporeInstrumentType>[] = [
    { pattern: /^FAZ[A-Z0-9]+$/, flowCell: NanoporeFlowCellValues.mk1d, instruments: [NanoporeInstrumentValues.minIon] },
    { pattern: /^PAA[A-Z0-9]+$/, flowCell: NanoporeFlowCellValues.promethIon, instruments: [NanoporeInstrumentValues.promethIon] },
    { pattern: /^FAS[A-Z0-9]+$/, flowCell: NanoporeFlowCellValues.flongle, instruments: [NanoporeInstrumentValues.minIon, NanoporeInstrumentValues.gridIon] }
];

export const UnknownFlowCellIdMappings: FlowCellIdMapping<UnknownFlowCellType, UnknownInstrumentType>[] = [
    { pattern: /^.*$/, flowCell: UnknownFlowCellValues.unknown, instruments: [UnknownInstrumentValues.unknown] }
];
