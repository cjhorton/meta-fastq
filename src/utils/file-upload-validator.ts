import { areSameFileQuick, isFastqFileQuick } from "../utils/file-utils";
import type { FileError } from "@/types/file-upload-types";

export const FASTQ_INVALID_EXT = "Not Fastq";
export const FASTQ_DUPLICATE = "Duplicate";

/**
 * Validates a given file to determine if it is a valid FASTQ file and eligible for upload.
 *
 * This function checks:
 * - That the file has a recognized FASTQ extension (.fastq, .fq, .fastq.gz, .fq.gz).
 * - That the file is not a duplicate of any already-accepted file (based on name).
 *
 * @param file - The file to validate.
 * @param existing - An array of already-accepted files to check for duplicates.
 * @returns An array of `FileError` strings indicating validation failures. Returns an empty array if the file is valid.
 */
export function validateFastqFile(file: File, existing: File[]): FileError[] {
    const errors: string[] = [];

    if (!isFastqFileQuick(file)) {
        errors.push(FASTQ_INVALID_EXT);
    }

    existing.forEach(f => {
        if (areSameFileQuick(f, file)) {
            errors.push(FASTQ_DUPLICATE);
        }
    })

    return errors;
}