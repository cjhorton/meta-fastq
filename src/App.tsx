import './App.css'
import { ColorModeButton } from "@/components/ui/color-mode";
import { Stack } from "@chakra-ui/react";
import { FastqUploader } from "@/components/fastq-uploader.tsx";

function App() {
    return (
        <Stack align="flex-start" w="full">
            <ColorModeButton/>
            <FastqUploader
                showUpload={true}
                setAcceptedFiles={() => {
                    // TODO: implement
                }}
                setRejectedFiles={() => {
                    // TODO: implement
                }}>
            </FastqUploader>
        </Stack>
    )
}

export default App
