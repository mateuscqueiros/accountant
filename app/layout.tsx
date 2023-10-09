import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';

import { AppProvider } from '@/providers/AppProvider';
import { ColorSchemeScript } from '@mantine/core';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Accountant',
	description: 'Para organizar suas contas!',
};

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
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
