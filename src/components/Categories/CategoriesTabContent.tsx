import {
	TableHeaderItem,
	TransactionItem,
	TransactionItemOptions,
} from '@/components/Transactions';
import { TableHeaderData } from '@/components/pages/Home';
import { initialOrdernateValue } from '@/consts/actions';
import { getCategoryById } from '@/lib/categories';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import { Table, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useContext, useState } from 'react';

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

export function CategoriesTabContent({ categoryId }: { categoryId: number }) {
	const data = useContext(DataContext);
	const theme = useMantineTheme();
	const isMediumDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const ordenationState = useState(initialOrdernateValue);

	const categoryExists = getCategoryById(categoryId);

	const [categoryItems, setCategoryItems] = useState(
		data.values.items.filter((item) => item.categoryId === categoryId)
	);

	const itemOptions: TransactionItemOptions<Transaction> = {
		label: true,
		date: true,
		value: true,
		type: isMediumDesktop,
		categoryId: isMediumDesktop,
		actions: isMediumDesktop,
	};

	return (
		<>
			{categoryExists ? (
				categoryItems.length > 0 ? (
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
				) : (
					<Text>Sem itens.</Text>
				)
			) : (
				<Text fw="bold">Não existe categoria com ID {categoryId}</Text>
			)}
		</>
	);
}
