'use client';
import { ConfigNav } from '@/components/Config/ConfigNav';
import { Flex, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ReactNode, createContext, useState } from 'react';
import { CategoryTabsContextType } from 'src/types';

export const CategoryTabsContext = createContext<CategoryTabsContextType>(
	{} as CategoryTabsContextType
);

export function CategoryTabProvider({ children }: { children: ReactNode }) {
	const [active, setActiveTab] = useState<number>(-1);

	const setActive = (id: number) => {
		setActiveTab(id);
	};

	return (
		<CategoryTabsContext.Provider
			value={{
				active,
				setActive,
			}}
		>
			{children}
		</CategoryTabsContext.Provider>
	);
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`);

	return (
		<CategoryTabProvider>
			<Flex direction={isMobile ? 'column' : 'row'}>
				<ConfigNav />
				{children}
			</Flex>
		</CategoryTabProvider>
	);
}
