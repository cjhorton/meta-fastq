import { useState } from "react";
import { Code, Show, Stack } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { FastqUploader } from "@/components/fastq-uploader.tsx";
import type { FileRejection } from "@/types/file-upload-types";
import { RejectedList } from "@/components/rejected-list.tsx";

function App() {
    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

    const handleFileAccept = (files: File[]) => {
        setAcceptedFiles(files);
    };

    const handleFileReject = (files: FileRejection[]) => {
        setRejectedFiles(files);
    };

    return (
        <Stack align="flex-start" w="full">
            <ColorModeButton/>
            <Code colorPalette="green"># Files to Process: {acceptedFiles.length}</Code>
            <Show when={rejectedFiles.length > 0}>
                <RejectedList rejection={rejectedFiles}/>
            </Show>
            <FastqUploader
                showUpload={true}
                setAcceptedFiles={handleFileAccept}
                setRejectedFiles={handleFileReject}>
            </FastqUploader>
        </Stack>
    )
}

export default App
