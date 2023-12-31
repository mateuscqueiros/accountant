'use client';

import { ConfigNav } from '@/components/Config/ConfigNav';
import { sortCategories } from '@/lib/categories';
import { Flex, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PropsWithChildren, useContext } from 'react';
import { DataContext } from './DataProvider';

interface CategoriesProvidersProps {
	categorySlug: string | null;
}

export const CategoriesProvider = ({
	children,
	categorySlug,
}: PropsWithChildren<CategoriesProvidersProps>) => {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`);

	const data = useContext(DataContext);
	const categories = data.values.user.categories;
	const sortedCategories = sortCategories(categories);

	return (
		<Flex direction={isMobile ? 'column' : 'row'}>
			<ConfigNav
				title="Categorias"
				route="/categories"
				items={sortedCategories}
				activeSlug={categorySlug}
			/>
			{children}
		</Flex>
	);
};
