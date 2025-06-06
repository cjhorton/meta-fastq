export const NanoporeInstrumentValues = {
    minIon: "MinION",
    gridIon: "GridION",
    promethIon: "PromethION",
    unknownNanopore: "Unknown",
} as const;

export const IlluminaInstrumentValues = {
    miSeq: "MiSeq",
    iSeq: "iSeq",
    miniSeq: "MiniSeq",
    nextSeq1000_2000: "NextSeq 1000/2000",
    novaSeqX: "NovaSeq X",
    nextSeq: "NextSeq",
    novaSeq: "NovaSeq",
    hiSeqX: "HiSeq X",
    hiSeq3000: "HiSeq 3000",
    hiSeq4000: "HiSeq 4000",
    hiSeq2500: "HiSeq 2500",
    hiSeq1500: "HiSeq 1500",
    hiSeq2000: "HiSeq 2000",
    genomeAnalyzerIIx: "Genome Analyzer IIx",
    unknownIllumina: "Unknown",
} as const;

export const UnknownInstrumentValues = {
    unknown: "Unknown",
} as const;

export const InstrumentValues = [
    ...Object.values(IlluminaInstrumentValues),
    ...Object.values(NanoporeInstrumentValues),
    ...Object.values(UnknownInstrumentValues),
] as const;

export type NanoporeInstrumentType = typeof NanoporeInstrumentValues[keyof typeof NanoporeInstrumentValues];
export type IlluminaInstrumentType = typeof IlluminaInstrumentValues[keyof typeof IlluminaInstrumentValues];
export type UnknownInstrumentType = typeof UnknownInstrumentValues[keyof typeof UnknownInstrumentValues];
export type InstrumentType =
    | IlluminaInstrumentType
    | NanoporeInstrumentType
    | UnknownInstrumentType;
