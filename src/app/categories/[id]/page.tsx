'use client';
import { getCategoryById } from '@/lib/categories';
import { DataContext } from '@/providers/DataProvider';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useContext } from 'react';

const ConfigContentWrapper = dynamic(() =>
	import('@/components/Config').then((mod) => mod.ConfigContentWrapper)
);
const CategoriesTabContent = dynamic(() =>
	import('@/components/Config').then((mod) => mod.CategoriesTabContent)
);

export default function CategoryIdPage() {
	const params = useParams();
	const activeId = Number(params.id);
	const categories = useContext(DataContext).values.user.categories;

	const activeCategory = getCategoryById(activeId, categories);

	return (
		<ConfigContentWrapper title={activeCategory ? activeCategory.label : ''}>
			<CategoriesTabContent categoryId={activeId} />
		</ConfigContentWrapper>
	);
}
