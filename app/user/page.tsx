'use client';
import { ConfigNav } from '@/components/ConfigNav';
import { ConfigTabs } from '@/components/ConfigTabs/ConfigTabs';
import { tabsData } from '@/shared/index';
import { ActiveTabContextType, TabType } from '@/shared/types';
import { Container, Flex, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ReactNode, createContext, useState } from 'react';

export const ConfigTabContext = createContext<ActiveTabContextType>({} as ActiveTabContextType);

export function ConfigTabProvider({ children }: { children: ReactNode }) {
	const setActive = (id: number) => {
		setActiveTab(
			tabsData.filter((tab) => {
				return tab.id === id;
			})[0]
		);
	};

	const [active, setActiveTab] = useState<TabType>(tabsData[0]);

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
				<Container p={0}>
					<ConfigTabs />
				</Container>
			</Flex>
		</ConfigTabProvider>
	);
}
