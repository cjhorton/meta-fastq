import { Code, List } from "@chakra-ui/react"
import type { FileRejection } from "@/types/file-upload-types";

export const RejectedList = ({rejection}: { rejection: FileRejection[] }) => {
    return (
        <>
            <Code colorPalette="red"># files rejected: {rejection.length}</Code>
            <List.Root variant="plain" align="center">
                {rejection.map((rejected: FileRejection) => (
                    <List.Item key={rejected.file.name}>
                        <Code colorPalette='red' variant='plain'>
                            {`- ${rejected.file.name} (${rejected.errors.join(', ')})`}
                        </Code>
                    </List.Item>
                ))}
            </List.Root>
        </>
    );
}
