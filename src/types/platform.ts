export const PlatformValues = {
    illumina: 'Illumina',
    nanoPore: 'Nanopore',
    unknown: 'Unknown'
} as const;

export type PlatformType = typeof PlatformValues[keyof typeof PlatformValues];