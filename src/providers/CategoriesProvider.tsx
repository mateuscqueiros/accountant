'use client';

import { ConfigNav } from '@/components/Config';
import { sortCategories } from '@/lib/categories';
import { Flex, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PropsWithChildren, useContext } from 'react';
import { DataContext } from './DataProvider';

interface CategoriesProvidersProps {
	categoryId: number | null;
}

export const CategoriesProvider = ({
	children,
	categoryId,
}: PropsWithChildren<CategoriesProvidersProps>) => {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`);

	const data = useContext(DataContext);
	const categories = data.values.user.categories;
	const sortedCategories = sortCategories(categories);

	return (
		<Flex direction={isMobile ? 'column' : 'row'}>
			<ConfigNav items={sortedCategories} activeId={categoryId} />
			{children}
		</Flex>
	);
};
