import { describe, it, expect } from 'vitest';
import { isGzipFile, isFastqFileQuick, areSameFileQuick } from './file-utils';

const GZIP_MAGIC_BYTES = new Uint8Array([0x1f, 0x8b]);

function createMockFile(contents: Uint8Array | string, name: string, type = 'application/octet-stream') {
    return new File([contents], name, {type});
}

describe('isGzipFile', () => {
    it('should return true for a file with correct GZIP magic numbers', async () => {
        const mockGzip = createMockFile(new Uint8Array([...GZIP_MAGIC_BYTES, 0x00, 0x00]), 'file.gz');
        const result = await isGzipFile(mockGzip);
        expect(result).toBe(true);
    });

    it('should return false for a file with incorrect magic numbers', async () => {
        const mockNotGzip = createMockFile(new Uint8Array([0x00, 0x00, ...GZIP_MAGIC_BYTES]), 'file.gz');
        const result = await isGzipFile(mockNotGzip);
        expect(result).toBe(false);
    });

    it('should return false for a non-GZIP file', async () => {
        const mockNonGzip = createMockFile('Hello world', 'file.txt');
        const result = await isGzipFile(mockNonGzip);
        expect(result).toBe(false);
    });

    it('should return false for an empty file', async () => {
        const emptyFile = createMockFile(new Uint8Array([]), 'empty.gz');
        const result = await isGzipFile(emptyFile);
        expect(result).toBe(false);
    });
});

describe('isFastqFileQuick', () => {
    it('should detect various valid FASTQ extensions', () => {
        const validNames = ['sample.fastq', 'sample.fq', 'sample.fastq.gz', 'sample.fq.gz'];
        for (const name of validNames) {
            const file = createMockFile('', name);
            expect(isFastqFileQuick(file)).toBe(true);
        }
    });

    it('should return false for invalid extensions', () => {
        const invalidNames = ['sample.txt', 'sample.fa', 'sample.fastq.gzip'];
        for (const name of invalidNames) {
            const file = createMockFile('', name);
            expect(isFastqFileQuick(file)).toBe(false);
        }
    });
});

describe('areSameFileQuick', () => {
    it('should return true if file names match', () => {
        const file1 = createMockFile('', 'read1.fq');
        const file2 = createMockFile('', 'read1.fq');
        expect(areSameFileQuick(file1, file2)).toBe(true);
    });

    it('should return false if file names differ', () => {
        const file1 = createMockFile('', 'read1.fq');
        const file2 = createMockFile('', 'read2.fq');
        expect(areSameFileQuick(file1, file2)).toBe(false);
    });
});
