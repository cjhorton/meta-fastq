import { forwardRef, useImperativeHandle } from "react";
import { Box, FileUpload, Icon, Stack, useFileUpload } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import type {
    FileRejection,
    FileRejectDetails,
    FileValidateDetails,
    FileAcceptDetails
} from "@/types/file-upload-types";
import { validateFastqFile } from "@/utils/fastq-validator";

export interface FileUploadHandle {
    clearFiles: () => void;
}

interface Props {
    showUpload: boolean;
    setAcceptedFiles: (files: File[]) => void;
    setRejectedFiles: (files: FileRejection[]) => void;
}

export const FastqUploader = forwardRef<FileUploadHandle, Props>(
    ({showUpload, setAcceptedFiles, setRejectedFiles}, ref) => {
        const fileUpload = useFileUpload({
            maxFiles: 96,
            validate: (file, details: FileValidateDetails) => {
                const errors = validateFastqFile(file, details.acceptedFiles);
                return errors.length ? errors : null;
            },
            onFileAccept: (details: FileAcceptDetails) => setAcceptedFiles(details.files),
            onFileReject: (details: FileRejectDetails) => setRejectedFiles(details.files)
        });

        useImperativeHandle(ref, () => ({
            clearFiles: () => fileUpload.clearFiles(),
        }));

        return (
            showUpload && (
                <Stack w="full">
                    <FileUpload.RootProvider value={fileUpload} alignItems="stretch">
                        <FileUpload.HiddenInput/>
                        <FileUpload.Dropzone>
                            <Icon size="md" color="fg.muted">
                                <LuUpload/>
                            </Icon>
                            <FileUpload.DropzoneContent>
                                <Box>Drag and drop Fastq files here</Box>
                                <Box color="fg.muted">(or click to select files)</Box>
                            </FileUpload.DropzoneContent>
                        </FileUpload.Dropzone>
                        <FileUpload.List clearable/>
                    </FileUpload.RootProvider>
                </Stack>)
        )
    });