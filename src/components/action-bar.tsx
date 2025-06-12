import { Button, Group, Menu, Portal } from "@chakra-ui/react";
import type { Action, EnabledActions, SaveMethod } from "@/types/action";
import { LuCopy, LuFile } from "react-icons/lu";

const SAVE_TSV_FILE: SaveMethod = 'tsv-file';
const SAVE_CSV_FILE: SaveMethod = 'csv-file';
const SAVE_CLIPBOARD: SaveMethod = 'clipboard';

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
                    onActionSelected({type: 'Save', method: details.value as SaveMethod});
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
                            <Menu.Item value={SAVE_TSV_FILE}>
                                <LuFile/>
                                TSV File
                            </Menu.Item>
                            <Menu.Item value={SAVE_CSV_FILE}>
                                <LuFile/>
                                CSV File
                            </Menu.Item>
                            <Menu.Item value={SAVE_CLIPBOARD}>
                                <LuCopy/>
                                Clipboard
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