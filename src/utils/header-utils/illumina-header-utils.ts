import type { Stringify } from "@/types/utility-types.ts";
import type { IlluminaHeader } from "@/types/fastq-read-headers.ts";

type IlluminaHeaderGroups = Stringify<Omit<IlluminaHeader, 'umi'>> & {
    umi?: string;
};

export const ILLUMINA_HEADER_REGEX = /^@(?<instrument>\w+):(?<runNumber>\d+):(?<flowCellId>[A-Za-z0-9-]+):(?<lane>\d+):(?<tile>\d+):(?<xPos>\d+):(?<yPos>\d+)(?::(?<umi>[ATGCN]+\+[ATGCN]+))?\s(?<read>[12]):(?<isFiltered>[YN]):(?<control>\d+):(?<index>([ATGCN]+(?:\+[ATGCN]+)?)|\d+)$/;

export const isIlluminaPlatform = (header: string): boolean => {
    return ILLUMINA_HEADER_REGEX.test(header);
}

export const parseIlluminaHeader = (header: string): IlluminaHeader | null => {
    const match = ILLUMINA_HEADER_REGEX.exec(header.trim());
    if (!match?.groups) {
        return null;
    }
    const groups = match.groups as IlluminaHeaderGroups;

    return {
        instrument: groups.instrument,
        runNumber: Number(groups.runNumber),
        flowCellId: groups.flowCellId,
        lane: Number(groups.lane),
        tile: Number(groups.tile),
        xPos: Number(groups.xPos),
        yPos: Number(groups.yPos),
        umi: groups.umi,
        read: groups.read === '2' ? 2 : 1,
        isFiltered: groups.isFiltered === 'Y',
        control: Number(groups.control),
        index: groups.index
    };
}