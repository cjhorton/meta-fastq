import { useCallback, useRef, useState } from "react";
import { Code, Show, Stack } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { FastqUploader, type FastqUploaderHandle } from "@/components/fastq-uploader.tsx";
import type { FileRejection } from "@/types/file-upload-types";
import { RejectedList } from "@/components/rejected-list.tsx";
import { ActionBar } from "@/components/action-bar.tsx";
import { type Action, type EnabledActions, getEnabledActions, type SaveMethod } from "@/types/action.ts";
import type { Status as AppStatus } from "@/types/status.ts";
import { FastqProcessor } from "@/components/fastq-processor.tsx";
import type { FastqProcessingUpdate } from "@/types/fastq-processing-update.ts";
import { FastqResultsTable } from "@/components/FastqResultsTable/FastqResultsTable.tsx";

function App() {
    const [status, setStatus] = useState<AppStatus>('Idle')
    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const [filesToProcess, setFilesToProcess] = useState<File[]>([]);
    const [enabledActions, setEnabledActions] = useState<EnabledActions>(getEnabledActions('Idle'));
    const [processingUpdate, setProcessingUpdate] = useState<FastqProcessingUpdate>({results: [], status: 'initial'});

    const fastqUploadRef = useRef<FastqUploaderHandle>(null);

    const handleFileAccept = (files: File[]) => {
        if (status === 'Idle' || status === 'Pending') {
            if (files.length === 0) {
                updateStatus('Idle');
                setRejectedFiles([]);
            } else {
                updateStatus('Pending');
            }
            setAcceptedFiles(files);
        }
    };

    const handleFileReject = (files: FileRejection[]) => {
        setRejectedFiles(files);
    };

    const handleRunAction = () => {
        if (status === 'Pending') {
            updateStatus('Running');
            setFilesToProcess([...acceptedFiles]);
            handleClearAction();
        }
    };

    const handleClearAction = () => {
        fastqUploadRef.current?.clearFiles();
        setAcceptedFiles([]);
        setRejectedFiles([]);
    };

    const handleResetAction = () => {
        handleClearAction();
        setFilesToProcess([]);
        setProcessingUpdate({results: [], status: 'initial'});
        updateStatus('Idle');
    };

    const handleSaveAction = (method: SaveMethod) => {
        //TODO: save results
        console.log('save results - ', method);
    };

    const handleUserAction = (action: Action) => {
        switch (action.type) {
            case 'Run':
                handleRunAction();
                break;
            case 'Clear':
                handleClearAction();
                break;
            case 'Reset':
                handleResetAction();
                break;
            case 'Save':
                handleSaveAction(action.method);
                break;
        }
    };

    const updateEnabledActions = useCallback((status: AppStatus) => {
        const enabledActions = getEnabledActions(status);
        setEnabledActions(enabledActions);
    }, []);

    const updateStatus = useCallback((newStatus: AppStatus) => {
        console.log('status update', newStatus);
        setStatus((current) => {
            if (newStatus !== current) {
                updateEnabledActions(newStatus);
                return newStatus;
            }
            return current;
        });
    }, [updateEnabledActions]);

    const handleProcessingUpdate = useCallback((update: FastqProcessingUpdate) => {
        setProcessingUpdate(update);
        if (update.status === 'complete') {
            updateStatus('Complete');
        }
    }, [updateStatus]);

    return (
        <Stack align="flex-start" w="full">
            <ColorModeButton/>
            <Code colorPalette="green"># Files to Process: {acceptedFiles.length}</Code>
            <Show when={rejectedFiles.length > 0}>
                <RejectedList rejection={rejectedFiles}/>
            </Show>
            <ActionBar enabledActions={enabledActions} onActionSelected={handleUserAction}></ActionBar>
            <FastqUploader
                ref={fastqUploadRef}
                showUpload={status === 'Idle' || status === 'Pending'}
                setAcceptedFiles={handleFileAccept}
                setRejectedFiles={handleFileReject}>
            </FastqUploader>
            <FastqProcessor files={filesToProcess} onProcessingUpdate={handleProcessingUpdate}/>
            <Show when={processingUpdate.results.length > 0}>
                <FastqResultsTable results={processingUpdate.results}/>
            </Show>
        </Stack>
    )
}

export default App
