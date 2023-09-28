'use client';
import { ConfigTab } from '@/components/Config';
import { ConfigNav } from '@/components/Config/ConfigNav';
import { tabsData } from '@/consts/UserTab';
import { Flex, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ReactNode, createContext, useState } from 'react';
import { ActiveTabContext, Tab } from 'src/types';

export const ConfigTabContext = createContext<ActiveTabContext>({} as ActiveTabContext);

export function ConfigTabProvider({ children }: { children: ReactNode }) {
	const setActive = (id: number) => {
		setActiveTab(
			tabsData.filter((tab) => {
				return tab.id === id;
			})[0]
		);
	};

	const [active, setActiveTab] = useState<Tab>(tabsData[0]);

	return (
		<ConfigTabContext.Provider
			value={{
				active,
				values: tabsData,
				setActive,
			}}
		>
			{children}
		</ConfigTabContext.Provider>
	);
}

export default function ConfigPage() {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`);

	return (
		<ConfigTabProvider>
			<Flex direction={isMobile ? 'column' : 'row'}>
				<ConfigNav />
				<ConfigTab />
			</Flex>
		</ConfigTabProvider>
	);
}
