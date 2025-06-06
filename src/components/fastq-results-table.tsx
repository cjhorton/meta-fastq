import { Table } from "@chakra-ui/react"
import type { FastqResult } from "@/types/fastq-result.ts";
import { formatFileSize } from "@/utils/file-utils.ts";
import { arrayOrDefault, valueOrDefault } from "@/utils/ui-utils.ts";

export const FastqResultsTable = ({results}: { results: FastqResult[] }) => {
    return (
        <Table.Root size="sm">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader>Error Msg</Table.ColumnHeader>
                    <Table.ColumnHeader>Size (Disk)</Table.ColumnHeader>
                    <Table.ColumnHeader>Platform</Table.ColumnHeader>
                    <Table.ColumnHeader>Instrument Id</Table.ColumnHeader>
                    <Table.ColumnHeader>Instrument Type</Table.ColumnHeader>
                    <Table.ColumnHeader>Flow Cell Id</Table.ColumnHeader>
                    <Table.ColumnHeader>Read</Table.ColumnHeader>
                    <Table.ColumnHeader>Cycles</Table.ColumnHeader>
                    <Table.ColumnHeader>Indexes/Sample #</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {results.map((result) => {
                    const {file, status, error, platform, instrumentId, instrumentTypes, flowcellId, readNumber,cycles, indexes} = result;
                    return (
                        <Table.Row key={file.name}>
                            <Table.Cell>{file.name}</Table.Cell>
                            <Table.Cell>{status}</Table.Cell>
                            <Table.Cell>{valueOrDefault(error, 'N/A')}</Table.Cell>
                            <Table.Cell>{formatFileSize(file.size)}</Table.Cell>
                            <Table.Cell>{valueOrDefault(platform)}</Table.Cell>
                            <Table.Cell>{valueOrDefault(instrumentId)}</Table.Cell>
                            <Table.Cell>{arrayOrDefault(instrumentTypes)}</Table.Cell>
                            <Table.Cell>{valueOrDefault(flowcellId)}</Table.Cell>
                            <Table.Cell>{valueOrDefault(readNumber)}</Table.Cell>
                            <Table.Cell>{valueOrDefault(cycles)}</Table.Cell>
                            <Table.Cell>{valueOrDefault(indexes)}</Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table.Root>
    );
}
