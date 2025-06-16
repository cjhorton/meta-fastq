import {
    type IlluminaInstrumentType,
    type InstrumentType,
    type UnknownInstrumentType,
    UnknownInstrumentValues
} from "../types/instruments.ts";
import { IlluminaInstrumentIdMappings, type InstrumentIdMapping, } from "../types/instrument-id-mappings.ts";

export function determineIlluminaInstrument(instrumentId: string): IlluminaInstrumentType[] {
    return determineInstrument<IlluminaInstrumentType>(instrumentId, IlluminaInstrumentIdMappings);
}

export function getUnknownInstrument(instrumentId: string): UnknownInstrumentType[] {
    return determineInstrument<UnknownInstrumentType>(instrumentId, []);
}

function determineInstrument<TInstrument extends InstrumentType>(instrumentId: string, mappings: InstrumentIdMapping<TInstrument>[]): TInstrument[] {
    for (const mapping of mappings) {
        if (mapping.pattern.test(instrumentId)) {
            return mapping.instruments;
        }
    }
    return [UnknownInstrumentValues.unknown as TInstrument];
}