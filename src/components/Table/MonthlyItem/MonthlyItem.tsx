import { ModalsContext } from '@/providers/ModalsProvider';
import { Table } from '@mantine/core';
import { format } from 'date-fns';
import { useContext } from 'react';
import { BillsDataItem } from 'src/types/Data/data.types';

export function MonthlyItem({ item }: { item: BillsDataItem }) {
	const modals = useContext(ModalsContext);

	return (
		<>
			<Table.Tr
				style={{ cursor: 'pointer', opacity: item.active ? 1 : 0.5 }}
				onClick={() => {
					modals.item.openUpdate(item);
				}}
			>
				<Table.Td>{item.label}</Table.Td>
				<Table.Td>{item.value}</Table.Td>
				<Table.Td>{format(new Date(item.date !== '' ? item.date : new Date()), 'dd')}</Table.Td>
			</Table.Tr>
		</>
	);
}
