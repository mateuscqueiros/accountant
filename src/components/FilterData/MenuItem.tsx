import { FilterOptions } from '@/lib/utils';
import { Transaction } from '@/types/data';
import { Checkbox, Menu } from '@mantine/core';
import { Dispatch, PropsWithChildren, SetStateAction, useCallback, useState } from 'react';

interface MenuItemProps<T> {
	filters: [T, Dispatch<SetStateAction<T>>];
	prop: keyof T;
	value: Transaction['type'] | Transaction['categoryId'] | Transaction['class'];
}

export function MenuItem({
	filters,
	prop,
	value,
	children,
}: PropsWithChildren<MenuItemProps<FilterOptions<Transaction>>>) {
	const [filter, setFilters] = filters;

	const propItems: any[] | undefined = filter[prop];
	const [checked, setChecked] = useState(propItems?.includes(value));

	const handleChange = useCallback(
		(filter: FilterOptions<Transaction>, isChecked: boolean) => {
			const propItems: any[] | undefined = filter[prop];
			if (!propItems) {
				return;
			}
			const valueIndex = propItems.indexOf(value);

			if (isChecked && !(valueIndex > -1)) {
				// ADICIONAR se o valor NÃO existir no array
				const propWithValue = [...propItems, value];

				setFilters({
					...filter,
					[prop]: propWithValue,
				});
			}

			if (!isChecked && valueIndex > -1) {
				// REMOVER se o valor EXISTIR no array
				const propWithoutValue = propItems.filter((item) => item !== value);

				setFilters({
					...filter,
					[prop]: propWithoutValue,
				});
			}
		},
		[checked]
	);

	return (
		<>
			<Menu.Item
				onClick={() => {
					handleChange(filter, !checked);
					setChecked(!checked);
				}}
				leftSection={<Checkbox onChange={() => {}} checked={checked} />}
			>
				{children}
			</Menu.Item>
		</>
	);
}
