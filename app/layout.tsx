'use client';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import Layout from '@/components/Layout';
import DataContextProvider from '@/contexts/DataContext';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';

export default function RootLayout({ children }: { children: any }) {
	return (
		<html lang="pt-BR">
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body>
				<MantineProvider theme={theme} defaultColorScheme="dark">
					<DatesProvider settings={{ locale: 'pt-br', firstDayOfWeek: 0, weekendDays: [0] }}>
						<DataContextProvider>
							<Notifications limit={5} />
							<Layout>{children}</Layout>
						</DataContextProvider>
					</DatesProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
