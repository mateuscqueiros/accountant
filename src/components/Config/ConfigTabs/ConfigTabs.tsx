import {
	TableHeaderItem,
	TransactionItem,
	TransactionItemOptions,
} from '@/components/Transactions';
import { TableHeaderData } from '@/components/pages/Home';
import { initialOrdernateValue } from '@/consts/actions';
import { getCategoryById } from '@/lib/categories';
import { CategoryTabsContext } from '@/providers/CategoriesProvider';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import { Table, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useContext, useState } from 'react';
import { Wrapper } from '.';

const tableHeaderData: TableHeaderData[] = [
	{
		label: 'Nome',
		prop: 'label',
	},
	{
		label: 'Data',
		prop: 'date',
	},
	{
		label: 'Categoria',
		prop: 'categoryId',
		visibleFrom: 'md',
	},
	{
		label: 'Tipo',
		prop: 'type',
		visibleFrom: 'md',
	},
	{
		label: 'Valor',
		prop: 'value',
	},
];

export function ConfigTabs({ categoryId }: { categoryId: number }) {
	const data = useContext(DataContext);
	const categoriesCtx = useContext(CategoryTabsContext);
	const activeCategory = getCategoryById(data.values.user.categories, categoriesCtx.active);

	return (
		<Wrapper title={activeCategory ? activeCategory.label : ''}>
			{selectActiveTab(data.values.items, categoryId)}
		</Wrapper>
	);
}

function selectActiveTab(items: Transaction[], categoryId: number) {
	const ordenationState = useState(initialOrdernateValue);
	const [categoryItems, setCategoryItems] = useState(
		items.filter((item) => item.categoryId === categoryId)
	);

	const theme = useMantineTheme();
	const isMediumDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	const itemOptions: TransactionItemOptions<Transaction> = {
		label: true,
		date: true,
		value: true,
		type: isMediumDesktop,
		categoryId: isMediumDesktop,
		actions: isMediumDesktop,
	};

	if (items.length > 0) {
		return (
			<>
				<Table highlightOnHover>
					<Table.Thead>
						<Table.Tr fw="bold">
							{tableHeaderData.map((dataItem) => {
								return (
									<TableHeaderItem
										key={dataItem.prop + dataItem.label}
										items={categoryItems}
										prop={dataItem.prop}
										ordenationState={ordenationState}
										setData={setCategoryItems}
										visibleFrom={dataItem.visibleFrom}
									>
										{dataItem.label}
									</TableHeaderItem>
								);
							})}
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{categoryItems.map((item) => (
							<TransactionItem options={itemOptions} key={item.id} item={item} />
						))}
					</Table.Tbody>
				</Table>
			</>
		);
	} else {
		return <Text>Sem itens.</Text>;
	}
}
