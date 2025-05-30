import { useEffect } from "react";

interface Props {
    files: File[];
    onProcessingComplete: () => void;
}

export const FastqProcessor = ({files, onProcessingComplete}: Props) => {
    useEffect(() => {
        if (files.length === 0) return;

        const timer = setTimeout(() => {
            onProcessingComplete();
        }, 2000);

        return () => {
            clearTimeout(timer);
        }
    }, [files, onProcessingComplete]);

    return null;
}