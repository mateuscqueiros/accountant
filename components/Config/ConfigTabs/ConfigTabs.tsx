import { TransactionItem } from '@/components/TransactionItem/TransactionItem';
import { DataContext } from '@/contexts/DataContext';
import { getCategoryById } from '@/utils/categories';
import { Table, Text } from '@mantine/core';
import { CategoryTabsContext } from 'app/categories/layout';
import { useContext } from 'react';
import { Wrapper } from '.';

export function ConfigTabs({ categoryId }: { categoryId: number }) {
	const data = useContext(DataContext);
	const categoriesCtx = useContext(CategoryTabsContext);
	const activeCategory = getCategoryById(data.values.user.categories, categoriesCtx.active);

	return (
		<Wrapper title={activeCategory ? activeCategory.label : ''}>
			{selectActiveTab(categoryId)}
		</Wrapper>
	);
}

function selectActiveTab(categoryId: number) {
	const data = useContext(DataContext);
	const items = data.values.items.filter((item) => item.categoryId === categoryId);

	if (items.length > 0) {
		return (
			<>
				<Table highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Nome</Table.Th>
							<Table.Th>Valor</Table.Th>
							<Table.Th>Tipo</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{items.map((item) => (
							<TransactionItem key={item.id} item={item} />
						))}
					</Table.Tbody>
				</Table>
			</>
		);
	} else {
		return <Text>Sem itens.</Text>;
	}
}
