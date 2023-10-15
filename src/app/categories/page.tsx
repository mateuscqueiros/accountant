'use client';
import { CategoriesActions } from '@/components/Categories';
import { ConfigContentWrapper } from '@/components/Config';

export default function CategoriesPage() {
	return (
		<ConfigContentWrapper title={'Editar categorias'}>
			<CategoriesActions />
		</ConfigContentWrapper>
	);
}
