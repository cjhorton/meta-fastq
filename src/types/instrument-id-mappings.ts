import {
    type IlluminaInstrumentType,
    IlluminaInstrumentValues,
    type InstrumentType,
    type NanoporeInstrumentType, NanoporeInstrumentValues, type UnknownInstrumentType, UnknownInstrumentValues
} from "./instruments.ts";

export interface InstrumentIdMapping<T extends string = InstrumentType> {
    pattern: RegExp;
    instruments: T[];
}

export const IlluminaInstrumentIdMappings: InstrumentIdMapping<IlluminaInstrumentType>[] = [
    {pattern: /HWI-M\d+/, instruments: [IlluminaInstrumentValues.miSeq]},
    {pattern: /M\d+/, instruments: [IlluminaInstrumentValues.miSeq]},
    {pattern: /LH\d+/, instruments: [IlluminaInstrumentValues.novaSeqX]},
    {pattern: /VH\d+/, instruments: [IlluminaInstrumentValues.nextSeq1000_2000]},
    {pattern: /FS\d+/, instruments: [IlluminaInstrumentValues.iSeq]},
    {pattern: /MN\d+/, instruments: [IlluminaInstrumentValues.miniSeq]},
    {pattern: /NB\d+/, instruments: [IlluminaInstrumentValues.nextSeq]},
    {pattern: /NS\d+/, instruments: [IlluminaInstrumentValues.nextSeq]},
    {pattern: /NA\d+/, instruments: [IlluminaInstrumentValues.novaSeq]},
    {pattern: /A\d+/, instruments: [IlluminaInstrumentValues.novaSeq]},
    {pattern: /E\d+/, instruments: [IlluminaInstrumentValues.hiSeqX]},
    {pattern: /K\d+/, instruments: [IlluminaInstrumentValues.hiSeq3000, IlluminaInstrumentValues.hiSeq4000]},
    {pattern: /J\d+/, instruments: [IlluminaInstrumentValues.hiSeq3000]},
    {pattern: /D\d+/, instruments: [IlluminaInstrumentValues.hiSeq2500]},
    {pattern: /HWI-D\d+/, instruments: [IlluminaInstrumentValues.hiSeq2500]},
    {pattern: /C\d+/, instruments: [IlluminaInstrumentValues.hiSeq1500]},
    {pattern: /HWI-C\d+/, instruments: [IlluminaInstrumentValues.hiSeq1500]},
    {pattern: /SN\d+/, instruments: [IlluminaInstrumentValues.hiSeq2000, IlluminaInstrumentValues.hiSeq2500]},
    {pattern: /HWUSI/, instruments: [IlluminaInstrumentValues.genomeAnalyzerIIx]},
    {pattern: /.*/, instruments: [IlluminaInstrumentValues.unknownIllumina]}
];

export const NanoporeInstrumentIdMappings: InstrumentIdMapping<NanoporeInstrumentType>[] = [
    {pattern: /.*/, instruments: [NanoporeInstrumentValues.unknownNanopore]}
];

export const UnknownInstrumentIdMappings: InstrumentIdMapping<UnknownInstrumentType>[] = [
    {pattern: /.*/, instruments: [UnknownInstrumentValues.unknown]}
];

