'use client';
import { getCategoryById } from '@/lib/categories';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const ConfigContentWrapper = dynamic(() =>
	import('@/components/Config').then((mod) => mod.ConfigContentWrapper)
);
const CategoriesTabContent = dynamic(() =>
	import('@/components/Config').then((mod) => mod.CategoriesTabContent)
);

export default function CategoryIdPage() {
	const params = useParams();
	const activeId = Number(params.id);

	const activeCategory = getCategoryById(activeId);

	return (
		<ConfigContentWrapper title={activeCategory ? activeCategory.label : ''}>
			<CategoriesTabContent categoryId={activeId} />
		</ConfigContentWrapper>
	);
}
