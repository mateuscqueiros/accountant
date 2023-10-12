import { getCategory } from '@/lib/categories';
import { expenseColor, recipeColor } from '@/lib/colors';
import { getItemTypeIcon } from '@/lib/item';
import { confirmModal } from '@/lib/modals';
import { DataContext } from '@/providers/DataProvider';
import { ModalsContext } from '@/providers/ModalsProvider';
import { BillsDataItem } from '@/types/Data';
import { ActionIcon, Group, Table, Text, rem } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { format } from 'date-fns';
import { useContext } from 'react';
import { CategoryBadge } from '../CategoryBadge/CategoryBadge';

interface TransactionItemOptions {
	label: boolean;
	date: boolean;
	type: boolean;
	category: boolean;
	value: boolean;
	actions: boolean;
}

interface TransactionItemProps {
	item: BillsDataItem;
	options?: Partial<TransactionItemOptions>;
	dateFormat?: string;
}

export function TransactionItem({ item, options, dateFormat }: TransactionItemProps) {
	const modals = useContext(ModalsContext);
	const data = useContext(DataContext);

	const hasOptions = options !== undefined;

	const category = getCategory(data.values.user.categories, item.categoryId);
	const IconType = getItemTypeIcon(item.type);
	const isExpense = item.class === 'expense';

	return (
		<Table.Tr
			style={{ cursor: 'pointer' }}
			onClick={() => {
				modals.item.openUpdate(item);
			}}
		>
			{(!hasOptions || options.label) && (
				<Table.Td>
					<Text>{item.label}</Text>
				</Table.Td>
			)}
			{(!hasOptions || options.date) && (
				<Table.Td>
					<Text>{format(new Date(item.date), dateFormat || 'dd/MM/yyyy')}</Text>
				</Table.Td>
			)}
			{(!hasOptions || options.category) && (
				<Table.Td visibleFrom="sm">
					<CategoryBadge category={category} />
				</Table.Td>
			)}
			{(!hasOptions || options.type) && (
				<Table.Td visibleFrom="sm">
					<IconType />
				</Table.Td>
			)}
			{(!hasOptions || options.value) && (
				<Table.Td>
					<Text c={isExpense ? expenseColor : recipeColor}>${item.value}</Text>
				</Table.Td>
			)}

			{(!hasOptions || options.actions) && (
				<Table.Td visibleFrom="sm">
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
