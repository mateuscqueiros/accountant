import { CheckIcon, ColorSwatch, rem } from '@mantine/core';

export const ColorSwatchInput = ({
	selected,
	color,
	setColor,
}: {
	selected: string;
	color: string;
	setColor: (color: string) => void;
}) => {
	return (
		<ColorSwatch
			style={{ cursor: 'pointer', color: '#fff' }}
			color={`var(--mantine-color-${color})`}
			onClick={() => setColor(color)}
		>
			{color === selected && <CheckIcon style={{ width: rem(12), height: rem(12) }} />}
		</ColorSwatch>
	);
};
