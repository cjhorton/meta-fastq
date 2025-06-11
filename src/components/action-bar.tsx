import { Button, Group, Menu, Portal } from "@chakra-ui/react";
import type { Action, EnabledActions } from "@/types/action";
import { LuCopy, LuFile } from "react-icons/lu";

const SAVE_FILE = 'save-file';
const SAVE_CLIPBOARD = 'save-clipboard';

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
            <Menu.Root
                onSelect={(details) => {
                    const method = details.value === SAVE_FILE ? 'file' : 'clipboard';
                    onActionSelected({type: 'Save', method});
                }}>
                <Menu.Trigger asChild>
                    <Button
                        colorPalette="purple"
                        disabled={!enabledActions.save}>
                        Save Results
                    </Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value={SAVE_FILE}>
                                <LuFile/>
                                Tab-delimited File
                            </Menu.Item>
                            <Menu.Item value={SAVE_CLIPBOARD}>
                                <LuCopy/>
                                Copy to Clipboard
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
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