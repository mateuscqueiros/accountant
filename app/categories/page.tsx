'use client';
import { ConfigTab } from '@/components/Config';
import { ConfigNav } from '@/components/Config/ConfigNav';
import { DataContext } from '@/contexts/DataContext';
import { Flex, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ReactNode, createContext, useContext, useState } from 'react';
import { CategoryTabsContextType } from 'src/types';

export const CategoryTabsContext = createContext<CategoryTabsContextType>(
	{} as CategoryTabsContextType
);

export function CategoryTabProvider({ children }: { children: ReactNode }) {
	const data = useContext(DataContext);
	const categories = data.values.user.categories;

	const [active, setActiveTab] = useState<number>(-1);

	const setActive = (id: number) => {
		setActiveTab(id);
	};

	return (
		<CategoryTabsContext.Provider
			value={{
				active,
				values: categories,
				setActive,
			}}
		>
			{children}
		</CategoryTabsContext.Provider>
	);
}

export default function ConfigPage() {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`);

	return (
		<CategoryTabProvider>
			<Flex direction={isMobile ? 'column' : 'row'}>
				<ConfigNav />
				<ConfigTab />
			</Flex>
		</CategoryTabProvider>
	);
}
