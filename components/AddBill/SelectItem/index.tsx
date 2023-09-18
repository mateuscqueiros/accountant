import { ColorSwatch, Flex, Text, useMantineTheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { forwardRef } from 'react';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
	label: string;
	color: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
	({ label, color = 'gray', ...others }: ItemProps, ref) => {
		const theme = useMantineTheme();
		const colorScheme = useColorScheme();
		const dark = colorScheme === 'dark';

		const colorSplit = color.split('.');
		const swatchColor: string[] = [
			colorSplit[0],
			colorSplit[1] !== undefined ? colorSplit[1] : '6',
		];

		return (
			<div ref={ref} {...others}>
				<Flex h="100%" justify="space-between" align="center">
					<Text size="sm">{label}</Text>
					<ColorSwatch color={theme.colors[swatchColor[0]][swatchColor[1] as any]} radius="sm" />
				</Flex>
			</div>
		);
	}
);

export default SelectItem;
