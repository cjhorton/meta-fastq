import { Button, Group } from "@chakra-ui/react";
import type { Action, EnabledActions } from "@/types/action";

interface Props {
    enabledActions: EnabledActions;
    onActionSelected: (action: Action) => void;
}

export function ActionBar({enabledActions, onActionSelected}: Props) {
    return (
        <Group>
            <Button
                colorPalette="blue"
                disabled={!enabledActions.clear}
                onClick={() => {
                    onActionSelected({type: 'Clear'});
                }}>
                Clear Files
            </Button>
            <Button
                colorPalette="green"
                disabled={!enabledActions.run}
                onClick={() => {
                    onActionSelected({type: 'Run'});
                }}>
                Process Files
            </Button>
            <Button
                colorPalette="purple"
                disabled={!enabledActions.save}
                onClick={() => {
                    onActionSelected({type: 'Save'});
                }}>
                Save Results
            </Button>
            <Button
                colorPalette="orange"
                disabled={!enabledActions.reset}
                onClick={() => {
                    onActionSelected({type: 'Reset'});
                }}>
                Reset
            </Button>
        </Group>
    );
}