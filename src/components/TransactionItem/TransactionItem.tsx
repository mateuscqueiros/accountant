import { ModalsContext } from '@/providers/ModalsProvider';
import { BillsDataItem } from '@/types/Data';
import { getItemTypeLabel } from '@/utils/item';
import { Table } from '@mantine/core';
import { useContext } from 'react';

export function TransactionItem({ item }: { item: BillsDataItem }) {
	const modals = useContext(ModalsContext);

	return (
		<Table.Tr
			style={{ cursor: 'pointer' }}
			onClick={() => {
				console.log('ola');
				modals.item.openUpdate(item);
			}}
		>
			<Table.Td>{item.label}</Table.Td>
			<Table.Td>$ {item.value}</Table.Td>
			<Table.Td>{getItemTypeLabel(item.type)}</Table.Td>
		</Table.Tr>
	);
}
