import { Table } from "@chakra-ui/react"
import type { FastqResult } from "@/types/fastq-result.ts";
import { formatFileSize } from "@/utils/file-utils.ts";
import { valueOrDash } from "@/utils/ui-utils.ts";

export const FastqResultsTable = ({results}: { results: FastqResult[] }) => {
    return (
        <Table.Root size="sm">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader>Size</Table.ColumnHeader>
                    <Table.ColumnHeader>Platform</Table.ColumnHeader>
                    <Table.ColumnHeader>Cycles</Table.ColumnHeader>
                    <Table.ColumnHeader>Indexes/Sample #</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {results.map((result) => {
                    const {file, status, platform, cycles, indexes} = result;
                    return (
                        <Table.Row key={file.name}>
                            <Table.Cell>{file.name}</Table.Cell>
                            <Table.Cell>{status}</Table.Cell>
                            <Table.Cell>{formatFileSize(file.size)}</Table.Cell>
                            <Table.Cell>{valueOrDash(platform)}</Table.Cell>
                            <Table.Cell>{valueOrDash(cycles)}</Table.Cell>
                            <Table.Cell>{valueOrDash(indexes)}</Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table.Root>
    );
}
