import { describe, it, expect } from 'vitest';
import { FASTQ_DUPLICATE, FASTQ_INVALID_EXT, validateFastqFile } from './file-upload-validator';

function mockFile(name: string): File {
    return new File(["@SEQ\nAGCT\n+\n!!!!"], name);
}

describe('validateFastqFile', () => {
    it('returns no errors for a valid, unique fastq file', () => {
        const file = mockFile('sample.fastq');
        const existing: File[] = [];

        const result = validateFastqFile(file, existing);
        expect(result).toEqual([]);
    });

    it('returns FASTQ_DUPLICATE for an invalid extension', () => {
        const file = mockFile('sample.txt');
        const result = validateFastqFile(file, []);
        expect(result).toContain(FASTQ_INVALID_EXT);
    });

    it('returns FASTQ_DUPLICATE if file name matches one in existing list', () => {
        const file = mockFile('sample.fastq');
        const existing = [mockFile('sample.fastq')];

        const result = validateFastqFile(file, existing);
        expect(result).toContain(FASTQ_DUPLICATE);
    });

    it('returns both FASTQ_INVALID_EXT and FASTQ_DUPLICATE if both conditions fail', () => {
        const file = mockFile('sample.txt');
        const existing = [mockFile('sample.txt')];

        const result = validateFastqFile(file, existing);
        expect(result).toEqual(expect.arrayContaining([FASTQ_INVALID_EXT, FASTQ_DUPLICATE]));
    });

    it('handles multiple existing files correctly', () => {
        const file = mockFile('sample.fastq');
        const existing = [
            mockFile('other.fastq'),
            mockFile('sample.fastq'), // duplicate
        ];

        const result = validateFastqFile(file, existing);
        expect(result).toEqual([FASTQ_DUPLICATE]);
    });
});
