'use client';

import { createTheme, useMantineColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';

export const theme = createTheme({
	cursorType: 'pointer',
	colors: {},
});

export function useLightDark<T>(light: T, dark: T): T {
	const { colorScheme } = useMantineColorScheme();
	const [isLight, setIsLight] = useState<boolean>(colorScheme === 'light');

	useEffect(() => {
		setIsLight(colorScheme === 'light');
	}, [colorScheme]);

	return isLight ? light : dark;
}

export function useColors() {
	return {
		expenses: useLightDark('red.6', 'red.7'),
		recipes: useLightDark('green.6', 'green.8'),
	};
}
