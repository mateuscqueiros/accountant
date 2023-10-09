'use client';
import { Categories, Wrapper } from '@/components/Config';
import { CategoryTabsContext } from '@/providers/CategoriesProvider';
import { useContext, useEffect } from 'react';

export default function CategoriesPage() {
	const categoryCtx = useContext(CategoryTabsContext);

	useEffect(() => {
		categoryCtx.setActive(-1);
	}, []);

	return (
		<Wrapper title={'Editar categorias'}>
			<Categories />
		</Wrapper>
	);
}
