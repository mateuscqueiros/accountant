import { TransactionItem } from '@/components/Transactions';
import { DataContext } from '@/providers/DataProvider';
import { Table } from '@mantine/core';
import { useContext } from 'react';

export function HomePageContent() {
	const data = useContext(DataContext);
	const activeData = data.selectActiveData();

	return (
		<>
			<Table verticalSpacing="sm">
				<Table.Thead>
					<Table.Tr fw="bold">
						<Table.Td>Nome</Table.Td>
						<Table.Td>Data</Table.Td>
						<Table.Td visibleFrom="sm">Categoria</Table.Td>
						<Table.Td visibleFrom="sm">Tipo</Table.Td>
						<Table.Td>Preço</Table.Td>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{activeData.map((item) => {
						return <TransactionItem dateFormat="'Dia ' dd" key={item.id} item={item} />;
					})}
				</Table.Tbody>
			</Table>
		</>
	);
}
