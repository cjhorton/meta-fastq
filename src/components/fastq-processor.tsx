import { useEffect } from "react";

interface Props {
    files: File[];
    onProcessingComplete: () => void;
}

export const FastqProcessor = ({files, onProcessingComplete}: Props) => {
    useEffect(() => {
        console.log('files changed in FastqProcessor - ', files)
        if (files.length > 0) {
            console.log('processing files - ', files)
            setTimeout(() => {
                console.log('processing complete')
                onProcessingComplete();
            }, 2000);
        }
    }, [files, onProcessingComplete]);

    return null;
}