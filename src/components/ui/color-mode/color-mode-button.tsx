import { forwardRef } from "react";
import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react";
import type { IconButtonProps } from "@chakra-ui/react";
import { useColorMode } from "./use-color-mode";
import { ColorModeIcon } from "./color-mode-icon";

export const ColorModeButton = forwardRef<HTMLButtonElement, Omit<IconButtonProps, "aria-label">>(
    function ColorModeButton(props, ref) {
        const {toggleColorMode} = useColorMode();

        return (
            <ClientOnly fallback={<Skeleton boxSize="8"/>}>
                <IconButton
                    onClick={toggleColorMode}
                    variant="ghost"
                    aria-label="Toggle color mode"
                    size="sm"
                    ref={ref}
                    {...props}
                    css={{
                        _icon: {
                            width: "5",
                            height: "5",
                        },
                    }}
                >
                    <ColorModeIcon/>
                </IconButton>
            </ClientOnly>
        );
    }
);
