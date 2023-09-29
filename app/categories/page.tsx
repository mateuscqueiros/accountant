'use client';
import { Categories, Wrapper } from '@/components/Config';
import { useContext, useEffect } from 'react';
import { CategoryTabsContext } from './layout';

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
