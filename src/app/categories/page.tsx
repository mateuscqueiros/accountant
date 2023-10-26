'use client';
import { AddCategory } from '@/components/Categories';
import dynamic from 'next/dynamic';

const ConfigContentWrapper = dynamic(() =>
	import('@/components/Config/ConfigContent').then((mod) => mod.ConfigContentWrapper)
);
const CategoriesActions = dynamic(() =>
	import('@/components/Categories').then((mod) => mod.CategoriesActions)
);

export default function CategoriesPage() {
	return (
		<ConfigContentWrapper title={'Editar categorias'} rightSection={<AddCategory />}>
			<CategoriesActions />
		</ConfigContentWrapper>
	);
}
