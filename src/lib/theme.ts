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
	primaryColor: 'indigo',
	primaryShade: { light: 5, dark: 6 },
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
		return parseColor(light);
	} else {
		return parseColor(dark);
	}
}

export function parseColor(color: MantineColor) {
	const theme = useMantineTheme();
	const parseColor = parseThemeColor({ color, theme });

	return parseColor.value;
}

/**
 * Tema do Accountant
 */
export function useColors() {
	const colors = {
		logo: useLightDark('black', 'white'),
		expenses: useLightDark('red.6', 'red.7'),
		recipes: useLightDark('green.6', 'green.8'),
		text: {
			primary: useLightDark('black', 'white'),
			secondary: useLightDark('gray.7', 'gray.6'),
			tertiary: useLightDark('gray.6', 'gray.7'),
		},
		state: {
			hover: useLightDark('gray.1', 'dark.5'),
		},
	};

	return colors;
}
