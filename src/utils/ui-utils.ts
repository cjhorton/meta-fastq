import * as React from "react";

export const valueOrDash = (value: string | number | null | undefined): React.ReactNode => value ?? '-';