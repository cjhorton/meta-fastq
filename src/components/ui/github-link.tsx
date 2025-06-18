import { IconButton } from "@chakra-ui/react";
import { LuGithub } from "react-icons/lu";

export const GithubLink = () => {
    return (
        <IconButton asChild variant="ghost" size="lg" colorPalette="gray" aria-label="View on GitHub">
            <a href="https://github.com/cjhorton/meta-fastq" target="_blank" rel="noopener noreferrer">
                <LuGithub/>
            </a>
        </IconButton>
    );
};
