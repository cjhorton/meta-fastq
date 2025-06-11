import { Table } from "@chakra-ui/react"
import type { FastqResult } from "@/types/fastq-result.ts";
import { Tooltip } from "@/components/ui/tooltip.tsx";
import { tableColumns } from "../types/table-columns.ts";

export const FastqResultsTable = ({results}: { results: FastqResult[] }) => {
    return (
        <Table.Root size="sm">
            <Table.Header>
                <Table.Row>
                    {tableColumns.map((column) => (
                        <Tooltip key={column.key} content={column.tooltipText} openDelay={500}>
                            <Table.ColumnHeader>{column.label}</Table.ColumnHeader>
                        </Tooltip>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {results.map((result) => (
                    <Table.Row key={result.file.name}>
                        {tableColumns.map((column) => (
                            <Table.Cell key={column.key}>{column.accessor(result)}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
