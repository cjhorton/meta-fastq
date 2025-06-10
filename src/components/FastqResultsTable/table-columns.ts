import type { FastqResult } from "@/types/fastq-result.ts";
import * as React from "react";
import { formatFileSize } from "@/utils/file-utils.ts";
import { arrayOrDefault, valueOrDefault } from "@/utils/ui-utils.ts";

export type TableKeys = Exclude<keyof FastqResult, 'file'> | 'name' | 'size';

export interface TableColumns {
    key: TableKeys;
    label: string;
    tooltipText?: string;
    accessor: (row: FastqResult) => React.ReactNode;
}

export const tableColumns: TableColumns[] = [
    {
        key: 'name',
        label: 'Name',
        tooltipText: 'Name of the Fastq File',
        accessor: (row) => row.file.name
    },
    {
        key: 'status',
        label: 'Status',
        tooltipText: 'Processing status - Pending, Done, Error',
        accessor: (row) => row.status
    },
    {
        key: 'error',
        label: 'Error Msg',
        tooltipText: 'Error Message, if applicable, else "-"',
        accessor: (row) => valueOrDefault(row.error)
    },
    {
        key: 'size',
        label: 'Size',
        tooltipText: 'Size of the the Fastq file on disk',
        accessor: (row) => formatFileSize(row.file.size)
    },
    {
        key: 'platform',
        label: 'Platform',
        tooltipText: 'The sequencing platform used to generate the Fastq - Illumina, Oxford Nanopore, or Unknown',
        accessor: (row) => valueOrDefault(row.platform)
    },
    {
        key: 'instrumentId',
        label: 'Instrument Id',
        tooltipText: 'The id of the sequencing instrument.  Defaults to "-" if not available.',
        accessor: (row) => valueOrDefault(row.instrumentId)
    },
    {
        key: 'instrumentTypes',
        label: 'Instrument Type',
        tooltipText: 'Type of instrument calculated from the id.  This is based on known instrument default id values.' +
            '  If the id was changed by the lab, then it will likely be "unknown".' +
            '  Defaults to "-" if not available.',
        accessor: (row) => arrayOrDefault(row.instrumentTypes)
    },
    {
        key: 'flowCellId',
        label: 'Flow Cell Id',
        tooltipText: 'The id of the sequencing flow cell. Defaults to "-" if not available.',
        accessor: (row) => valueOrDefault(row.flowCellId)
    },
    {
        key: 'flowCellType',
        label: 'Flow Cell Type',
        tooltipText: 'Calculated flow cell type based on the flow cell id.  This is based on known flow cell id values.' +
            ' Defaults to "-" if not available.',
        accessor: (row) => valueOrDefault(row.flowCellType)
    },
    {
        key: 'runNumber',
        label: 'Run Number',
        tooltipText: 'Run number  of the sequencing instrument.  Defaults to "-" if not available.',
        accessor: (row) => valueOrDefault(row.runNumber)
    },
    {
        key: 'cycles',
        label: 'Cycles',
        tooltipText: 'Number of cycles.  Determined from the number of bases in the first read.  Defaults to "-" if not available.',
        accessor: (row) => valueOrDefault(row.cycles)
    },
    {
        key: 'indexes',
        label: 'Indexes/Sample #',
        tooltipText: 'Indexes or Sample Number.  Indexes can be multiple values separated by a "+".  ' +
            'Indexes must have been added to the fastq headers. Defaults to "-" if not available.',
        accessor: (row) => valueOrDefault(row.indexes)
    },
    {
        key: 'readNumber',
        label: 'Read',
        tooltipText: 'Read Number (1 or 2).  Defaults to "-" if not available.',
        accessor: (row) => valueOrDefault(row.readNumber)
    },
];