'use client';
import dynamic from 'next/dynamic';

const ConfigContentWrapper = dynamic(() =>
	import('@/components/Config').then((mod) => mod.ConfigContentWrapper)
);
const CategoriesActions = dynamic(() =>
	import('@/components/Categories').then((mod) => mod.CategoriesActions)
);

export default function CategoriesPage() {
	return (
		<ConfigContentWrapper title={'Editar categorias'}>
			<CategoriesActions />
		</ConfigContentWrapper>
	);
}
