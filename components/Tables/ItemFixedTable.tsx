import { ModalsContext } from '@/contexts/ModalsContext';
import { BillsDataItemType } from '@/shared/types/data.types';
import { Table } from '@mantine/core';
import { useContext } from 'react';

export function ItemFixedTable({ item }: { item: BillsDataItemType }) {
	const modals = useContext(ModalsContext);

	return (
		<Table.Tr
			style={{ cursor: 'pointer', opacity: item.active ? 1 : 0.5 }}
			onClick={() => {
				modals.item.openUpdate(item);
			}}
		>
			<Table.Td>{item.label}</Table.Td>
			<Table.Td>{item.value}</Table.Td>
			<Table.Td>{item.dueDay}</Table.Td>
		</Table.Tr>
	);
}
