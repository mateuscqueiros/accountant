'use client';
import { FilterData } from '@/components/FilterData';
import { initialFilterValue } from '@/consts/actions';
import { getCategoryBySlug } from '@/lib/categories';
import { FilterOptions } from '@/lib/utils';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';

const ConfigContentWrapper = dynamic(() =>
	import('@/components/Config/ConfigContent').then((mod) => mod.ConfigContentWrapper)
);

const CategoriesTabContent = dynamic(() =>
	import('@/components/Config/ConfigContent').then((mod) => mod.CategoriesTabContent)
);

export default function CategoryIdPage() {
	const params = useParams();
	const activeSlug = useMemo(() => String(params.id), [params]);
	const data = useContext(DataContext);
	const categories = data.values.user.categories;

	const activeCategory = getCategoryBySlug(activeSlug, categories);

	// Dados da página
	const allCategoryItemData = data.values.items.filter(
		(item) => item.categoryId === activeCategory.id
	);
	const categoryItemDisplayDataState = useState(allCategoryItemData);
	const [_, setCategoryItems] = categoryItemDisplayDataState;

	// Filtros
	const initialFilterState = {
		...initialFilterValue,
		categoryId: undefined,
	};
	const filterState = useState<FilterOptions<Transaction>>(initialFilterState);

	useEffect(() => {
		setCategoryItems(data.values.items.filter((item) => item.categoryId === activeCategory.id));
	}, [data.values.items, activeSlug]);

	return (
		<ConfigContentWrapper
			title={activeCategory ? activeCategory.label : ''}
			rightSection={
				<FilterData
					data={allCategoryItemData}
					displayDataState={categoryItemDisplayDataState}
					filterState={filterState}
					initialFilterState={initialFilterState}
				/>
			}
		>
			<CategoriesTabContent displayData={categoryItemDisplayDataState} categorySlug={activeSlug} />
		</ConfigContentWrapper>
	);
}
