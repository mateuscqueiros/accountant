import {
	OrdersOptions,
	TableHeaderItem,
	TransactionItem,
	TransactionItemOptions,
} from '@/components/Transaction';
import { Transaction } from '@/types/data';
import { MantineBreakpoint, ScrollArea, Table, useMantineTheme } from '@mantine/core';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import { Dispatch, SetStateAction } from 'react';

interface HomeContentProps {
	dataState: [Transaction[], Dispatch<SetStateAction<Transaction[]>>];
	ordenationState: [OrdersOptions, Dispatch<SetStateAction<OrdersOptions>>];
}

export interface TableHeaderData {
	label: string;
	prop: keyof OrdersOptions;
	visibleFrom?: MantineBreakpoint;
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
		visibleFrom: 'sm',
	},
	{
		label: 'Tipo',
		prop: 'type',
		visibleFrom: 'sm',
	},
	{
		label: 'Valor',
		prop: 'value',
	},
];

export function HomeContent({ dataState, ordenationState }: HomeContentProps) {
	const [data, setData] = dataState;
	const theme = useMantineTheme();
	const { height } = useViewportSize();

	const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

	const itemOptions: TransactionItemOptions<Transaction> = {
		label: true,
		date: true,
		value: true,
		type: isDesktop,
		categoryId: isDesktop,
		actions: isDesktop,
	};

	return (
		<>
			<ScrollArea h={height - 360}>
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
										visibleFrom={dataItem.visibleFrom}
									>
										{dataItem.label}
									</TableHeaderItem>
								);
							})}
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{data.map((item) => {
							return (
								<TransactionItem
									key={item.id}
									options={itemOptions}
									dateFormat="'Dia ' dd"
									item={item}
								/>
							);
						})}
					</Table.Tbody>
				</Table>
			</ScrollArea>
		</>
	);
}
