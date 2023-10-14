'use client';

import { ItemsForm } from '@/components/ItemForm';
import { Layout } from '@/components/Layout';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider as MntModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { theme } from '../lib/theme';
import { DataProvider } from './DataProvider';
import { ModalsProvider } from './ModalsProvider';

export const AppProvider = ({ children }: PropsWithChildren) => {
	const path = usePathname();

	const shouldHavePadding = !path.includes('categories');

	return (
		<MantineProvider theme={theme} defaultColorScheme="auto">
			<DatesProvider settings={{ locale: 'pt-br', firstDayOfWeek: 0, weekendDays: [0] }}>
				<ModalsProvider>
					<MntModalsProvider>
						<Notifications limit={5} />
						<NavigationProgress />
						<>
							<DataProvider>
								<ItemsForm />
								<Layout withPadding={shouldHavePadding}>{children}</Layout>
							</DataProvider>
						</>
					</MntModalsProvider>
				</ModalsProvider>
			</DatesProvider>
		</MantineProvider>
	);
};
