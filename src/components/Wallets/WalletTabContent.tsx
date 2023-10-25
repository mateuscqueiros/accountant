import { TableHeaderItem, TransactionItem, TransactionItemOptions } from '@/components/Transaction';
import { TableHeaderData } from '@/components/pages/Home';
import { initialOrdernateValue } from '@/consts/actions';
import { getWalletById } from '@/lib/wallets';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import { ScrollArea, Table, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { WalletStatistics } from '.';

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

interface WalletsTabContentProps {
	displayData: [Transaction[], Dispatch<SetStateAction<Transaction[]>>];
	walletId: number;
}

export function WalletsTabContent({ displayData, walletId }: WalletsTabContentProps) {
	const data = useContext(DataContext);
	const theme = useMantineTheme();
	const isMediumDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const ordenationState = useState(initialOrdernateValue);
	const wallets = useContext(DataContext).values.user.wallets;
	const { height } = useViewportSize();

	const walletsExists = getWalletById(walletId, wallets);

	const [walletItems, setWalletItems] = displayData;

	const tableContentData: TransactionItemOptions<Transaction> = {
		label: true,
		date: true,
		value: true,
		type: isMediumDesktop,
		categoryId: isMediumDesktop,
		actions: isMediumDesktop,
	};

	return (
		<>
			{walletsExists ? (
				walletItems.length > 0 ? (
					<>
						<WalletStatistics dataState={displayData} />
						<ScrollArea h={height - 350} w="100%">
							<Table highlightOnHover>
								<Table.Thead>
									<Table.Tr fw="bold">
										{tableHeaderData.map((dataItem) => {
											return (
												<TableHeaderItem
													key={dataItem.prop + dataItem.label}
													items={walletItems}
													prop={dataItem.prop}
													ordenationState={ordenationState}
													setData={setWalletItems}
													visibleFrom={dataItem.visibleFrom}
												>
													{dataItem.label}
												</TableHeaderItem>
											);
										})}
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{walletItems.map((item) => (
										<TransactionItem key={item.id} options={tableContentData} item={item} />
									))}
								</Table.Tbody>
							</Table>
						</ScrollArea>
					</>
				) : (
					<Text>Sem itens</Text>
				)
			) : (
				<Text fw="bold">Não existe carteira com ID {walletId}</Text>
			)}
		</>
	);
}
