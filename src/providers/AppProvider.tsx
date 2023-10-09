'use client';

import { ItemsForm } from '@/components/ItemForm';
import { Layout } from '@/components/Layout';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider as MntModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { usePathname } from 'next/navigation';
import { theme } from '../theme';
import { DataProvider } from './DataProvider';
import { ModalsProvider } from './ModalsProvider';

export const AppProvider = ({ children }: { children: any }) => {
	const path = usePathname();

	const shouldHavePadding = !path.includes('categories');

	return (
		<MantineProvider theme={theme} defaultColorScheme="dark">
			<DatesProvider settings={{ locale: 'pt-br', firstDayOfWeek: 0, weekendDays: [0] }}>
				<ModalsProvider>
					<Notifications limit={5} />
					<NavigationProgress />
					<>
						<DataProvider>
							<MntModalsProvider>
								<ItemsForm />
								<Layout withPadding={shouldHavePadding}>{children}</Layout>
							</MntModalsProvider>
						</DataProvider>
					</>
				</ModalsProvider>
			</DatesProvider>
		</MantineProvider>
	);
};
