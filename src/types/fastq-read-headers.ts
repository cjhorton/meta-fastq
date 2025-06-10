export interface IlluminaHeader {
    instrument: string;
    runNumber: number;
    flowCellId: string;
    lane: number;
    tile: number;
    xPos: number;
    yPos: number;
    umi?: string;
    read: number;
    isFiltered: boolean;
    control: number;
    index: string;
}

export interface NanoporeHeader {
    readId: string;
    runId?: string;
    sampleId?: string;
    flowCellId?: string;
    protocolGroupId?: string;
    channel?: number;
    startTime?: string;
    basecallModelVersionId?: string;
    basecallGpu?: string;
    barcode?: string;
    barcodeAlias?: string;
    parentReadId?: string;
}