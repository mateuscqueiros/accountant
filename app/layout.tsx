'use client';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { Layout } from '@/components/Layout';
import { DataContextProvider } from '@/contexts/DataContext';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { usePathname } from 'next/navigation';
import { theme } from '../theme';

export default function RootLayout({ children }: { children: any }) {
	const path = usePathname();

	const shouldHavePadding = !path.includes('categories');

	return (
		<html lang="pt-BR">
			<head>
				<ColorSchemeScript />
				<title>Accountant</title>
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
				<meta name="description" content="Para organizar suas contas!" />
			</head>
			<body>
				<MantineProvider theme={theme} defaultColorScheme="dark">
					<DatesProvider settings={{ locale: 'pt-br', firstDayOfWeek: 0, weekendDays: [0] }}>
						<ModalsProvider>
							<DataContextProvider>
								<Notifications limit={5} />
								<Layout withPadding={shouldHavePadding}>{children}</Layout>
							</DataContextProvider>
						</ModalsProvider>
					</DatesProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
