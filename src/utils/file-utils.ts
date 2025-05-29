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