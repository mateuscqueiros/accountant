'use client';

import { ConfigNav } from '@/components/Config';
import { CategoryTabsContextType } from '@/types/UserTab';
import { Flex, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ReactNode, createContext, useState } from 'react';

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

export const CategoriesProvider = ({ children }: { children: any }) => {
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
};
