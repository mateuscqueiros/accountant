import { CheckIcon, ColorSwatch, parseThemeColor, rem, useMantineTheme } from '@mantine/core';

export const ColorSwatchInput = ({
	selected,
	color,
	setColor,
}: {
	selected: string;
	color: string;
	setColor: (color: string) => void;
}) => {
	const theme = useMantineTheme();
	const parsedColor = parseThemeColor({ color, theme });

	console.log(color, selected);

	return (
		<ColorSwatch
			style={{ cursor: 'pointer', color: '#fff' }}
			color={parsedColor.color}
			onClick={() => setColor(color)}
		>
			{color === selected && <CheckIcon style={{ width: rem(12), height: rem(12) }} />}
		</ColorSwatch>
	);
};
