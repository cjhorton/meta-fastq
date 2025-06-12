type MimeType = 'text/csv;charset=utf-8' | 'text/tab-separated-values;charset=utf-8';

const saveResultsToFile = (filename: string, content: string, mimeType: MimeType) => {
    const blob = new Blob([content], {type: mimeType});
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

export const saveResultsCsvFile = (filename: string, results: string) => {
    saveResultsToFile(filename, results, 'text/csv;charset=utf-8');
};

export const saveResultsTsvFile = (filename: string, results: string) => {
    saveResultsToFile(filename, results, 'text/tab-separated-values;charset=utf-8');
}

export const copyResultsToClipboard = async (results: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(results);
    } catch (error) {
        console.error('Failed to copy results to clipboard', error);
        throw error;
    }
};
