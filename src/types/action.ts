export type Action = 'Clear' | 'Run' | 'Reset' | 'Save';

export interface EnabledActions {
    clear: boolean;
    run: boolean;
    reset: boolean;
    save: boolean;
}