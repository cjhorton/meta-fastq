import type { Status } from "./status";

export type Action = 'Clear' | 'Run' | 'Reset' | 'Save';

export interface EnabledActions {
    clear: boolean;
    run: boolean;
    reset: boolean;
    save: boolean;
}

const statusActionMap: Record<Status, EnabledActions> = {
    Idle: {
        clear: false,
        run: false,
        reset: false,
        save: false,
    },
    Pending: {

        clear: true,
        run: true,
        reset: false,
        save: false,
    },
    Running: {
        clear: false,
        run: false,
        reset: true,
        save: false,
    },
    Complete: {
        clear: false,
        run: false,
        reset: true,
        save: true,
    },
    Error: {
        clear: false,
        run: false,
        reset: true,
        save: false,
    },
}

export function getEnabledActions(status: Status): EnabledActions {
    return statusActionMap[status];
}
