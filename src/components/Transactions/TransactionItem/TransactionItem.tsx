import { ActionIcon } from '@/components/Icons';
import { getCategoryById } from '@/lib/categories';
import { getItemTypeIcon } from '@/lib/item';
import { confirmModal } from '@/lib/modals';
import { useColors } from '@/lib/theme';
import { DataContext } from '@/providers/DataProvider';
import { ModalsContext } from '@/providers/ModalsProvider';
import { Transaction } from '@/types/data';
import { Group, Table, Text, rem, useMantineTheme } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { format } from 'date-fns';
import { useContext } from 'react';
import { CategoryBadge } from '../CategoryBadge/CategoryBadge';

export type TransactionItemOptions<T> = {
	[K in keyof Partial<Omit<T, 'installments'>>]: boolean;
} & { actions?: boolean };

interface TransactionItemProps {
	item: Transaction;
	options?: Partial<TransactionItemOptions<Transaction>>;
	dateFormat?: string;
}

export function TransactionItem({ item, options, dateFormat }: TransactionItemProps) {
	const modals = useContext(ModalsContext);
	const data = useContext(DataContext);
	const colors = useColors();
	let optionsValues = {
		actions: true,
		categoryId: true,
		date: true,
		label: true,
		type: true,
		value: true,
		...options,
	};

	const category = getCategoryById(item.categoryId);
	const IconType = getItemTypeIcon(item.type);
	const isExpense = item.class === 'expense';
	const theme = useMantineTheme();

	return (
		<Table.Tr
			style={{ cursor: 'pointer' }}
			onClick={() => {
				modals.item.openUpdate(item);
			}}
		>
			{optionsValues.label && (
				<Table.Td>
					<Text>{item.label}</Text>
				</Table.Td>
			)}
			{optionsValues.date && (
				<Table.Td>
					<Text>{format(new Date(item.date), dateFormat || 'dd/MM/yyyy')}</Text>
				</Table.Td>
			)}
			{optionsValues.categoryId && (
				<Table.Td>
					<CategoryBadge category={category} />
				</Table.Td>
			)}
			{optionsValues.type && (
				<Table.Td>
					<IconType />
				</Table.Td>
			)}
			{optionsValues.value && (
				<Table.Td>
					<Text c={isExpense ? colors.expenses : colors.recipes}>${item.value}</Text>
				</Table.Td>
			)}

			{optionsValues.actions && (
				<Table.Td>
					<Group gap={0} justify="flex-end">
						<ActionIcon
							onClick={(e) => {
								e.stopPropagation();
								confirmModal({
									title: `Deseja deletar o item ${item.label}?`,
									onConfirm: () => data.item.delete(item.id),
								});
							}}
							variant="subtle"
							color="red"
						>
							<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
						</ActionIcon>
					</Group>
				</Table.Td>
			)}
		</Table.Tr>
	);
}
