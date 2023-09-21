import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ToggleTheme() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	useHotkeys([['ctrl+shift+j', () => toggleColorScheme()]]);

	return (
		<Tooltip label={dark ? 'Tema claro' : 'Tema escuro'}>
			<ActionIcon size="2.1rem" variant="default" onClick={() => toggleColorScheme()}>
				{dark ? <IconSun size="1.3rem" /> : <IconMoon size="1.3rem" />}
			</ActionIcon>
		</Tooltip>
	);
}
