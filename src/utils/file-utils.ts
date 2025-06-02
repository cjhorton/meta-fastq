/**
 * Checks if the provided file is a GZIP file based on its magic numbers.
 *
 * GZIP files start with the magic number 0x1f 0x8b.
 * See: https://en.wikipedia.org/wiki/Gzip
 * @param {File} file - The file to check.
 * @return {Promise<boolean>} A promise that resolves to true if the file is a GZIP file, otherwise false.
 */
export async function isGzipFile(file: File): Promise<boolean> {
    const magicNumbers = new Uint8Array(await file.slice(0, 2).arrayBuffer());
    return magicNumbers[0] === 0x1f && magicNumbers[1] === 0x8b;
}

/**
 * Quick heuristic check based on file extensions only.
 * Does not inspect file contents.
 * @param file
 */
export function isFastqFileQuick(file: File): boolean {
    const name = file.name.toLowerCase();
    return (
        name.endsWith('.fastq') ||
        name.endsWith('.fq') ||
        name.endsWith('.fastq.gz') ||
        name.endsWith('.fq.gz')
    );
}

/**
 * Quick heuristic check based on file names only.
 * @param file1
 * @param file2
 */
export function areSameFileQuick(file1: File, file2: File): boolean {
    return file1.name === file2.name;
}

const KB = 1024;
const MB = KB * 1024;
const GB = MB * 1024;

/**
 * Formats a file size in bytes into a human-readable string with appropriate units (B, KB, MB, GB).
 * This represents the size on disk
 *
 * @param size - The size of the file in bytes. Must be a non-negative number.
 * @return A formatted string representing the file size in the most appropriate unit.
 */
export function formatFileSize(size: number): string {
    if (!size || size < 0) {
        return '0 B';
    }

    if (size >= GB) {
        const value = (size / GB).toFixed(size >= 10 * GB ? 1 : 2);
        return `${String(value)} GB`;
    }

    if (size >= MB) {
        const value = (size / MB).toFixed(size >= 10 * MB ? 1 : 2);
        return `${String(value)} MB`;
    }

    if (size >= KB) {
        const value = (size / KB).toFixed(size >= 10 * KB ? 1 : 2);
        return `${String(value)} KB`;
    }

    return `${String(size)} B`;
}