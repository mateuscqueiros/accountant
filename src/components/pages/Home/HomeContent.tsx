import { OrdersOptions, TableHeaderItem, TransactionItem } from '@/components/Transactions';
import { BillsDataItem } from '@/types/Data';
import { Table } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

interface HomeContentProps {
	dataState: [BillsDataItem[], Dispatch<SetStateAction<BillsDataItem[]>>];
	ordenationState: [OrdersOptions, Dispatch<SetStateAction<OrdersOptions>>];
}

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
		label: 'Valor',
		prop: 'value',
	},
];

export function HomeContent({ dataState, ordenationState }: HomeContentProps) {
	const [data, setData] = dataState;

	return (
		<>
			<Table verticalSpacing="sm">
				<Table.Thead>
					<Table.Tr fw="bold">
						{tableHeaderData.map((dataItem) => {
							return (
								<TableHeaderItem
									key={dataItem.prop}
									items={data}
									prop={dataItem.prop}
									ordenationState={ordenationState}
									setData={setData}
									hiddenMobile={dataItem.hiddenMobile}
								>
									{dataItem.label}
								</TableHeaderItem>
							);
						})}
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{data.map((item) => {
						return <TransactionItem dateFormat="'Dia ' dd" key={item.id} item={item} />;
					})}
				</Table.Tbody>
			</Table>
		</>
	);
}
