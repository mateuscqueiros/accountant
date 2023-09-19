import { ModalsContext } from '@/contexts/ModalsContext';
import { BillsDataItemType } from '@/shared/types/data.types';
import { Table } from '@mantine/core';
import { format } from 'date-fns';
import { useContext } from 'react';

export function ItemMonthlyTable({ item }: { item: BillsDataItemType }) {
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
