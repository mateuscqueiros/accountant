import { ActionActivateItem, ActionDeleteItem } from '@/components/Actions/Item';
import { getCategoryById } from '@/lib/categories';
import { getItemTypeIcon } from '@/lib/item';
import { useColors } from '@/lib/theme';
import { getWalletById } from '@/lib/wallets';
import { DataContext } from '@/providers/DataProvider';
import { ModalsContext } from '@/providers/ModalsProvider';
import { Transaction } from '@/types/data';
import { Group, Table, Text, rem } from '@mantine/core';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
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

	const colors = useColors();
	let optionsValues = {
		actions: true,
		categoryId: true,
		date: true,
		label: true,
		type: true,
		value: true,
		walletId: false,
		...options,
	};

	const data = useContext(DataContext);
	const categories = optionsValues.categoryId ? data.values.user.categories : undefined;
	const wallets = optionsValues.walletId ? data.values.user.wallets : undefined;

	const category =
		optionsValues.categoryId && categories
			? getCategoryById(item.categoryId, categories)
			: undefined;
	const wallet =
		optionsValues.walletId && wallets ? getWalletById(item.walletId, wallets) : undefined;
	const IconType = optionsValues.type ? getItemTypeIcon(item.type) : undefined;
	const isExpense = item.class === 'expense';

	const [hovered, setHovered] = useState(false);

	return (
		<Table.Tr
			style={{ cursor: 'pointer' }}
			onClick={() => {
				modals.item.openUpdate(item);
			}}
			bg={hovered ? colors.state.hover : undefined}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{optionsValues.label && (
				<Table.Td>
					<Text
						style={{ overflow: 'hidden', whiteSpace: 'pre-wrap' }}
						maw={150}
						c={item.active ? undefined : colors.text.secondary}
					>
						{item.label}
					</Text>
				</Table.Td>
			)}
			{optionsValues.date && (
				<Table.Td>
					<Text>{format(new Date(item.date), dateFormat || 'dd/MM/yyyy')}</Text>
				</Table.Td>
			)}
			{optionsValues.categoryId && category && (
				<Table.Td>
					<CategoryBadge category={category} />
				</Table.Td>
			)}
			{optionsValues.type && IconType && (
				<Table.Td>
					<IconType color={colors.text.primary} stroke={1.2} />
				</Table.Td>
			)}
			{optionsValues.walletId && wallet && (
				<Table.Td>
					<Text>{wallet.label}</Text>
				</Table.Td>
			)}
			{optionsValues.value && (
				<Table.Td>
					<Text c={isExpense ? colors.expenses : colors.recipes}>${item.value}</Text>
				</Table.Td>
			)}

			{optionsValues.actions && (
				<Table.Td maw={rem(150)}>
					<Group gap="sm" justify="flex-end">
						{!item.active && <ActionActivateItem item={item} />}
						<ActionDeleteItem item={item} />
					</Group>
				</Table.Td>
			)}
		</Table.Tr>
	);
}
