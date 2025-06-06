import { type FlowCellType, UnknownFlowCellValues } from "../types/flow-cells.ts";
import {
    type FlowCellIdMapping,
    IlluminaFlowCellIdMappings,
    NanoporeFlowCellIdMappings
} from "../types/flow-cell-id-mappings.ts";

export function determineIlluminaFlowCell(flowCellId: string): FlowCellType {
    return determineFlowCell(flowCellId, IlluminaFlowCellIdMappings);
}

export function determineNanoporeFlowCell(flowCellId: string): FlowCellType {
    return determineFlowCell(flowCellId, NanoporeFlowCellIdMappings);
}

export function getUnknownFlowCell(instrumentId: string): FlowCellType {
    return determineFlowCell(instrumentId, []);
}

function determineFlowCell(flowCellId: string, mappings: FlowCellIdMapping<FlowCellType>[]): FlowCellType {
    const normalizedId = flowCellId.replace(/^000000000-/, '');
    for (const mapping of mappings) {
        if (mapping.pattern.test(normalizedId)) {
            return mapping.flowCell;
        }
    }

    return UnknownFlowCellValues.unknown;
}