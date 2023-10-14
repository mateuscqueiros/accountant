import { ModalsContext } from '@/providers/ModalsProvider';
import { Transaction } from '@/types/data/data.types';
import { Table } from '@mantine/core';
import { useContext } from 'react';

export function InstallmentItem({ item }: { item: Transaction }) {
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
			<Table.Td>
				{item.installments.current} / {item.installments.total}
			</Table.Td>
			<Table.Td>{item.dueDay}</Table.Td>
		</Table.Tr>
	);
}
