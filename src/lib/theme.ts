'use client';

import {
	MantineColor,
	createTheme,
	parseThemeColor,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { useEffect, useState } from 'react';

export const theme = createTheme({
	cursorType: 'pointer',
	fontSizes: {
		xxs: '0.7rem',
	},
	lineHeights: {
		xxs: '0.7rem',
	},
	spacing: {
		xxs: '0.3rem',
	},
});

export function useLightDark(light: string, dark: string) {
	const { colorScheme } = useMantineColorScheme();
	const [isLight, setIsLight] = useState<boolean>(colorScheme === 'light');

	useEffect(() => {
		setIsLight(colorScheme === 'light');
	}, [colorScheme]);

	if (isLight) {
		const parseLight = parseColor(light);
		return parseLight.isThemeColor ? parseLight.color : parseLight.value;
	} else {
		const parseDark = parseColor(dark);
		return parseDark.isThemeColor ? parseDark.color : parseDark.value;
	}
}

export function parseColor(color: MantineColor) {
	const theme = useMantineTheme();
	const parseColor = parseThemeColor({ color, theme });

	return parseColor;
}

export function useColors() {
	const colors = {
		logo: useLightDark('black', 'white'),
		expenses: useLightDark('red.6', 'red.7'),
		recipes: useLightDark('green.6', 'green.8'),
		text: {
			secondary: 'gray.6',
		},
	};

	return colors;
}
