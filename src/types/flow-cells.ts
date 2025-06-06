export const IlluminaFlowCellValues = {
    standardOutput: "Standard Output",
    midOrHighOutput: "Mid or High Output",
    nano: "MiSeq Nano",
    micro: "MiSeq Micro",
    standardV2: "MiSeq Standard v2",
    standard: "MiSeq Standard",
    midOutput: "Mid Output",
    highOutput: "High Output",
    p1OrP2: "P1 or P2",
    p3: "P3",
    rapidRunV2: "Rapid Run (2-lane) v2",
    trueSeqV3: "TrueSeq v3",
    highOutputV3: "High Output v3",
    eightLaneV1: "8-lane v1",
    eightLane: "8-lane",
    spOrS1: "SP or S1",
    s2: "S2",
    s4: "S4",
    tenB: "10B",
    twentyFiveB: "25B",
    unknown: "Unknown",
} as const;

export const NanoporeFlowCellValues = {
    mk1d: "Mk1D",
    promethIon: "PromethIon",
    flongle: "Flongle",
    unknown: "Unknown",
} as const;

export const UnknownFlowCellValues = {
    unknown: "Unknown",
} as const;

export const FlowCellTypeValues = [
    ...Object.values(IlluminaFlowCellValues),
    ...Object.values(NanoporeFlowCellValues),
    ...Object.values(UnknownFlowCellValues),
] as const;

export type IlluminaFlowCellType = typeof IlluminaFlowCellValues[keyof typeof IlluminaFlowCellValues];
export type NanoporeFlowCellType = typeof NanoporeFlowCellValues[keyof typeof NanoporeFlowCellValues];
export type UnknownFlowCellType = typeof UnknownFlowCellValues[keyof typeof UnknownFlowCellValues];

export type FlowCellType =
    | IlluminaFlowCellType
    | NanoporeFlowCellType
    | UnknownFlowCellType;