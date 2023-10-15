'use client';
import { CategoriesTabContent, ConfigContentWrapper } from '@/components/Config';
import { getCategoryById } from '@/lib/categories';
import { DataContext } from '@/providers/DataProvider';
import { useParams } from 'next/navigation';
import { useContext } from 'react';

export default function CategoryIdPage() {
	const data = useContext(DataContext);
	const params = useParams();
	const activeId = Number(params.id);

	const activeCategory = getCategoryById(activeId);

	return (
		<ConfigContentWrapper title={activeCategory ? activeCategory.label : ''}>
			<CategoriesTabContent categoryId={activeId} />
		</ConfigContentWrapper>
	);
}
