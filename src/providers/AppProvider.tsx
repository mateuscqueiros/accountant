'use client';

import { Layout } from '@/components/Layout';
import { BlobBackground } from '@/components/Layout/BlobBackground/BlobBackground';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider as MntModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { theme } from '../lib/theme';
import { DataProvider } from './DataProvider';
import { ModalsProvider } from './ModalsProvider';

const ItemsForm = dynamic(() => import('@/components/ItemsForm').then((mod) => mod.ItemsForm));

export const AppProvider = ({ children }: PropsWithChildren) => {
	const path = usePathname();

	const shouldHavePadding = !path.includes('categories') && !path.includes('wallets');
	const shouldHaveBlobBackground = path.includes('login') || path.includes('signup');

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
								{shouldHaveBlobBackground && <BlobBackground>{children}</BlobBackground>}
								{!shouldHaveBlobBackground && (
									<Layout withPadding={shouldHavePadding}>{children}</Layout>
								)}
							</DataProvider>
						</>
					</MntModalsProvider>
				</ModalsProvider>
			</DatesProvider>
		</MantineProvider>
	);
};
