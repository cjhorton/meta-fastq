import { forwardRef } from "react";
import { Span } from "@chakra-ui/react";
import type { SpanProps } from "@chakra-ui/react";

export const LightMode = forwardRef<HTMLSpanElement, SpanProps>(
    function LightMode(props, ref) {
        return (
            <Span
                color="fg"
                display="contents"
                className="chakra-theme light"
                colorPalette="gray"
                colorScheme="light"
                ref={ref}
                {...props}
            />
        );
    }
);

export const DarkMode = forwardRef<HTMLSpanElement, SpanProps>(
    function DarkMode(props, ref) {
        return (
            <Span
                color="fg"
                display="contents"
                className="chakra-theme dark"
                colorPalette="gray"
                colorScheme="dark"
                ref={ref}
                {...props}
            />
        );
    }
);
