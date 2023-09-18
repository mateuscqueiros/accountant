import '@mantine/core/styles.css';

import DataProvider from '@/contexts/DataContext';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import { getCookie, setCookie } from 'cookies-next';
import 'dayjs/locale/pt-br';
import { GetServerSidePropsContext } from 'next';
import type { AppProps } from 'next/app';
import { useState } from 'react';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const { Component, pageProps } = props;
	const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
		setColorScheme(nextColorScheme);
		setCookie('mantine-color-scheme', nextColorScheme, {
			maxAge: 60 * 60 * 24 * 30,
		});
	};

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				theme={{
					colorScheme,
					cursorType: 'pointer',
				}}
				withGlobalStyles
				withNormalizeCSS
			>
				<DatesProvider settings={{ locale: 'pt-br', firstDayOfWeek: 0, weekendDays: [0] }}>
					<DataProvider>
						<Notifications limit={5} />
						<Component {...pageProps} />
					</DataProvider>
				</DatesProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
	colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
