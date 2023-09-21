import { DataContext } from '@/contexts/DataContext/DataContext';
import { ModalsContext } from '@/contexts/ModalsContext/ModalsContext';
import { BillsDataItemType } from '@/shared/types/data.types';
import { getCategory } from '@/utils/categories';
import { Badge, Table } from '@mantine/core';
import { getDay } from 'date-fns';
import { useContext } from 'react';

export function DefaultItem({ item }: { item: BillsDataItemType }) {
	const modals = useContext(ModalsContext);
	const data = useContext(DataContext);

	const category = getCategory(data.user.categories, item.categoryId);

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
				<Table.Td>{getDay(new Date(item.date))}</Table.Td>
				<Table.Td>
					{item.type === 'installment'
						? `${item.installments.current} / ${item.installments.total}`
						: 'Sem'}
				</Table.Td>
				<Table.Td>{item.type === 'monthly' ? 'Sem' : item.dueDay}</Table.Td>
				<Table.Td>
					<Badge variant="light" color={category.color}>
						{category.label}
					</Badge>
				</Table.Td>
			</Table.Tr>
		</>
	);
}
