import { OrdersOptions, TableHeaderItem, TransactionItem } from '@/components/Transactions';
import { DataContext } from '@/providers/DataProvider';
import { Table } from '@mantine/core';
import { useContext, useState } from 'react';

interface TableHeaderData {
	label: string;
	prop: keyof OrdersOptions;
	hiddenMobile?: boolean;
}

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
		hiddenMobile: true,
	},
	{
		label: 'Tipo',
		prop: 'type',
		hiddenMobile: true,
	},
	{
		label: 'Preço',
		prop: 'value',
	},
];

export function HomeContent() {
	const data = useContext(DataContext);
	let activeData = data.selectActiveData();

	const [displayData, setDisplayData] = useState(activeData);

	const orders = useState<OrdersOptions>({
		label: 0,
		categoryId: 0,
		date: 0,
		type: 0,
		value: 0,
	});

	return (
		<>
			<Table verticalSpacing="sm">
				<Table.Thead>
					<Table.Tr fw="bold">
						{tableHeaderData.map((dataItem) => {
							return (
								<TableHeaderItem
									key={dataItem.prop}
									items={activeData}
									prop={dataItem.prop}
									options={orders}
									setData={setDisplayData}
									hiddenMobile={dataItem.hiddenMobile}
								>
									{dataItem.label}
								</TableHeaderItem>
							);
						})}
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{displayData.map((item) => {
						return <TransactionItem dateFormat="'Dia ' dd" key={item.id} item={item} />;
					})}
				</Table.Tbody>
			</Table>
		</>
	);
}
