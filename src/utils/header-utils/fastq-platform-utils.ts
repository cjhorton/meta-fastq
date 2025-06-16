import type { PlatformType } from "@/types/platform.ts";
import { isIlluminaPlatform } from "../../utils/header-utils/illumina-header-utils.ts";
import { isNanoporePlatform } from "../../utils/header-utils/nanopore-header-utils.ts";

export const determinePlatform = (header: string): PlatformType => {
    if (!header) return 'Unknown';

    if (isIlluminaPlatform(header)) return 'Illumina';

    if (isNanoporePlatform(header)) return 'Nanopore';

    return 'Unknown';
}