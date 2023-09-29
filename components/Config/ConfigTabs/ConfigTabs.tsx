import { DataContext } from '@/contexts/DataContext';
import { getCategoryById } from '@/utils/categories';
import { Text } from '@mantine/core';
import { CategoryTabsContext } from 'app/categories/page';
import { useContext } from 'react';
import { Categories, Wrapper } from '.';

export function ConfigTab() {
	const categoriesCtx = useContext(CategoryTabsContext);
	const data = useContext(DataContext);
	const activeCategory = getCategoryById(data.values.user.categories, categoriesCtx.active);

	return (
		<Wrapper title={activeCategory ? activeCategory.label : 'Editar categorias'}>
			{selectActiveTab(categoriesCtx.active)}
		</Wrapper>
	);
}

function selectActiveTab(categoryId: number) {
	switch (categoryId) {
		case -1:
			return <Categories />;
		default:
			return <Text>Selecione uma tab</Text>;
	}
}
