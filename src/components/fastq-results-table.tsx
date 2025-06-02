import { Table } from "@chakra-ui/react"
import type { FastqResult } from "@/types/fastq-result.ts";
import { formatFileSize } from "@/utils/file-utils.ts";

export const FastqResultsTable = ({results}: { results: FastqResult[] }) => {
    return (
        <Table.Root size="sm">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader>Size</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {results.map((result) => {
                    const {file, status} = result;
                    return (
                        <Table.Row key={file.name}>
                            <Table.Cell>{file.name}</Table.Cell>
                            <Table.Cell>{status}</Table.Cell>
                            <Table.Cell>{formatFileSize(file.size)}</Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table.Root>
    );
}
