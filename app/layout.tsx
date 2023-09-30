'use client';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';

import { ItemsForm } from '@/components/ItemForm';
import { Layout } from '@/components/Layout';
import { DataContextProvider } from '@/contexts/DataContext';
import { ModalsContextProvider } from '@/contexts/ModalsContext';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { theme } from '../src/theme';

export default function RootLayout({ children }: { children: any }) {
	const path = usePathname();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const shouldHavePadding = !path.includes('categories');

	useEffect(() => {
		nprogress.complete();
		return () => {
			nprogress.start();
		};
	}, [pathname, searchParams]);

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
							<Notifications limit={5} />
							<NavigationProgress />
							<>
								<DataContextProvider>
									<ModalsContextProvider>
										<ItemsForm />
										<Layout withPadding={shouldHavePadding}>{children}</Layout>
									</ModalsContextProvider>
								</DataContextProvider>
							</>
						</ModalsProvider>
					</DatesProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
