import { useState } from "react";
import { Code, Show, Stack } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { FastqUploader } from "@/components/fastq-uploader.tsx";
import type { FileRejection } from "@/types/file-upload-types";
import { RejectedList } from "@/components/rejected-list.tsx";
import { ActionBar } from "@/components/action-bar.tsx";
import { type Action, type EnabledActions, getEnabledActions } from "@/types/action.ts";
import type { Status as AppStatus } from "@/types/status.ts";

function App() {
    const [status, setStatus] = useState<AppStatus>('Idle')
    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const [enabledActions, setEnabledActions] = useState<EnabledActions>(getEnabledActions('Idle'));

    const handleFileAccept = (files: File[]) => {
        setAcceptedFiles(files);
    };

    const handleFileReject = (files: FileRejection[]) => {
        setRejectedFiles(files);
    };

    const handleRunAction = () => {
        updateStatus('Running');
    };

    const handleClearAction = () => {
        //TODO: clear files
        console.log('clear files');
    };

    const handleResetAction = () => {
        //TODO: reset app
        console.log('reset app');
    };

    const handleSaveAction = () => {
        //TODO: save results
        console.log('save results');
    };

    const handleUserAction = (action: Action) => {
        switch (action) {
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
                handleSaveAction();
                break;
        }
    };

    const updateStatus = (newStatus: AppStatus) => {
        if (newStatus !== status) {
            setStatus(newStatus);
            updateEnabledActions(newStatus);
        }
    };

    const updateEnabledActions = (status: AppStatus) => {
        const enabledActions = getEnabledActions(status);
        setEnabledActions(enabledActions);
    };

    return (
        <Stack align="flex-start" w="full">
            <ColorModeButton/>
            <Code colorPalette="green"># Files to Process: {acceptedFiles.length}</Code>
            <Show when={rejectedFiles.length > 0}>
                <RejectedList rejection={rejectedFiles}/>
            </Show>
            <ActionBar enabledActions={enabledActions} onActionSelected={handleUserAction}></ActionBar>
            <FastqUploader
                showUpload={true}
                setAcceptedFiles={handleFileAccept}
                setRejectedFiles={handleFileReject}>
            </FastqUploader>
        </Stack>
    )
}

export default App
