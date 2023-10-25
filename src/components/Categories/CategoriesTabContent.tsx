import { TableHeaderItem, TransactionItem, TransactionItemOptions } from '@/components/Transaction';
import { TableHeaderData } from '@/components/pages/Home';
import { initialOrdernateValue } from '@/consts/actions';
import { getCategoryById } from '@/lib/categories';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import { ScrollArea, Table, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';

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
		label: 'Tipo',
		prop: 'type',
		visibleFrom: 'sm',
	},
	{
		label: 'Carteira',
		prop: 'walletId',
		visibleFrom: 'sm',
	},
	{
		label: 'Valor',
		prop: 'value',
	},
];

export function CategoriesTabContent({ categoryId }: { categoryId: number }) {
	const data = useContext(DataContext);
	const theme = useMantineTheme();
	const isMediumDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const ordenationState = useState(initialOrdernateValue);
	const categories = useContext(DataContext).values.user.categories;
	const { height } = useViewportSize();

	const categoryExists = getCategoryById(categoryId, categories);

	const [categoryItems, setCategoryItems] = useState(
		data.values.items.filter((item) => item.categoryId === categoryId)
	);

	const tableContentData: TransactionItemOptions<Transaction> = {
		label: true,
		date: true,
		value: true,
		categoryId: false,
		type: isMediumDesktop,
		walletId: isMediumDesktop,
		actions: isMediumDesktop,
	};

	useEffect(() => {
		setCategoryItems(data.values.items.filter((item) => item.categoryId === categoryId));
	}, [data.values.items]);

	return (
		<>
			{categoryExists ? (
				categoryItems.length > 0 ? (
					<ScrollArea h={height - 200} w="100%">
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
									<TransactionItem key={item.id} options={tableContentData} item={item} />
								))}
							</Table.Tbody>
						</Table>
					</ScrollArea>
				) : (
					<Text>Sem itens</Text>
				)
			) : (
				<Text fw="bold">Não existe categoria com ID {categoryId}</Text>
			)}
		</>
	);
}
