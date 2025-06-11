import type { FastqResult } from "@/types/fastq-result.ts";
import { tableColumns } from "@/types/table-columns.ts";

const convertToDelimitedText = (
    results: FastqResult[],
    delimiter: ',' | '\t' = '\t',
    quoteFields = delimiter === ','): string => {

    const escapeValue = (value: string) => {
        if (!quoteFields) return value;

        const needsQuoting = value.includes(delimiter) || value.includes('"') || value.includes('\n');
        const escaped = value.replace(/"/g, '""');
        return needsQuoting ? `"${escaped}"` : escaped;
    }

    const lines: string[] = [];

    const header = tableColumns.map(column => escapeValue(column.label)).join(delimiter);
    lines.push(header);

    for (const result of results) {
        const row = tableColumns.map(column => escapeValue(column.textAccessor(result)));
        lines.push(row.join(delimiter));
    }

    return lines.join("\n");
}

export const convertResultsToCsv = (results: FastqResult[]): string => convertToDelimitedText(results, ',');
export const convertResultsToTsv = (results: FastqResult[]): string => convertToDelimitedText(results, '\t');
