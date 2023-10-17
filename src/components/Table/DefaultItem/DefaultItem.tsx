import { getCategoryById } from '@/lib/categories';
import { DataContext } from '@/providers/DataProvider';
import { ModalsContext } from '@/providers/ModalsProvider';
import { Transaction } from '@/types/data/data.types';
import { Badge, Table, parseThemeColor, useMantineTheme } from '@mantine/core';
import { getDay } from 'date-fns';
import { useContext } from 'react';

export function DefaultItem({ item }: { item: Transaction }) {
	const modals = useContext(ModalsContext);
	const categories = useContext(DataContext).values.user.categories;

	const category = getCategoryById(item.categoryId, categories);
	const theme = useMantineTheme();
	const categoryColor = parseThemeColor({ color: category.color, theme }).color;

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
					<Badge variant="light" color={categoryColor}>
						{category.label}
					</Badge>
				</Table.Td>
			</Table.Tr>
		</>
	);
}
