import type { PlatformType } from "@/types/platform.ts";
import { isIlluminaPlatform } from "../../utils/header-utils/illumina-header-utils.ts";

export const determinePlatform = (header: string): PlatformType => {
    if (!header) return 'Unknown';

    if (isIlluminaPlatform(header)) return 'Illumina';

    return 'Unknown';
}