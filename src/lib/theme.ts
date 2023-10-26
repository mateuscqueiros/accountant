'use client';

import {
	MantineColor,
	createTheme,
	parseThemeColor,
	rem,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';

export const theme = createTheme({
	cursorType: 'pointer',
	primaryColor: 'indigo',
	primaryShade: { light: 7, dark: 9 },
	fontSizes: {
		xxs: '0.7rem',
	},
	lineHeights: {
		xxs: '0.7rem',
	},
	spacing: {
		xxs: '0.3rem',
	},
	other: {
		centerMaw: rem('1200px'),
	},
});

export function useLightDark(light: string, dark: string) {
	const { colorScheme } = useMantineColorScheme();
	const [isLight, setIsLight] = useState<boolean>(colorScheme === 'light');

	useEffect(() => {
		setIsLight(colorScheme === 'light');
	}, [colorScheme]);

	const lightColor = useParseColor(light);
	const darkColor = useParseColor(dark);

	if (isLight) {
		return lightColor;
	} else {
		return darkColor;
	}
}

export function useParseColor(color: MantineColor) {
	const theme = useMantineTheme();
	const parseColor = parseThemeColor({ color, theme });

	return parseColor.value;
}

export const inputColors = [
	'red.6',
	'pink.6',
	'grape.6',
	'violet.6',
	'indigo.6',
	'blue.3',
	'cyan.6',
	'teal.6',
	'green.6',
	'lime.6',
	'yellow.5',
	'orange.6',
];

/**
 * Tema do Accountant
 */
export function useColors() {
	const getInputColors = useCallback((inputColors: string[]) => {
		return inputColors.map((color) => {
			return useLightDark(color, color);
		});
	}, []);

	const colors = {
		logo: useLightDark('black', 'white'),
		expenses: useLightDark('red.6', 'red.7'),
		recipes: useLightDark('teal.7', 'green.8'),
		text: {
			primary: useLightDark('black', 'white'),
			secondary: useLightDark('gray.7', 'gray.6'),
			tertiary: useLightDark('gray.6', 'gray.7'),
		},
		state: {
			hover: useLightDark('gray.1', 'dark.7'),
		},
		input: getInputColors(inputColors),
	};

	return colors;
}
