import { useColors } from '@/lib/theme';
import { FilterOptions, filterItems, getNumberOfItemsByPropValue } from '@/lib/utils';
import { DataContext } from '@/providers/DataProvider';
import { Transaction, UserData } from '@/types/data';
import { Box, Flex, Menu, Switch, Text } from '@mantine/core';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { MenuItem } from './MenuItem';

interface FilterDataMenuProps {
	data: Transaction[];
	displayDataState: [Transaction[], Dispatch<SetStateAction<Transaction[]>>];
	filterState: [FilterOptions<Transaction>, Dispatch<SetStateAction<FilterOptions<Transaction>>>];
}

interface MenuItemComponentType<T> {
	label: string;
	prop: keyof T;
	value: Transaction['type'] | Transaction['categoryId'] | Transaction['class'];
}

function getMenuItemsData(data: UserData): any {
	const categories = data.user.categories.map((category) => {
		return {
			label: category.label,
			prop: 'categoryId',
			value: category.id,
			group: 'Categoria',
		};
	});

	const active = [
		{
			label: 'Ativo',
			prop: 'active',
			value: true,
		},
	];

	const classes = [
		{
			label: 'Despesa',
			prop: 'class',
			value: 'expense',
			group: 'Classe',
		},
		{
			label: 'Receita',
			prop: 'class',
			value: 'recipe',
			group: 'Tipo',
		},
	];

	const types = [
		{
			label: 'Mensal',
			prop: 'type',
			value: 'monthly',
			group: 'Tipo',
		},
		{
			label: 'Fixo',
			prop: 'type',
			value: 'fixed',
			group: 'Tipo',
		},
		{
			label: 'Parceladas',
			prop: 'type',
			value: 'installment',
			group: 'Tipo',
		},
	];

	const itemsData = {
		active: {
			items: [...active],
		},
		classes: {
			items: [...classes],
			group: 'Classes',
		},
		types: {
			items: [...types],
			group: 'Tipos',
		},
		categories: {
			items: [...categories],
			group: 'Categorias',
		},
	};

	return itemsData;
}

export function FilterDataMenu({ data, displayDataState, filterState }: FilterDataMenuProps) {
	const dataProvider = useContext(DataContext);
	const colors = useColors();

	const [filter] = filterState;
	const [_, setDisplayData] = displayDataState;
	const [contains, setContains] = useState(true);

	useEffect(() => {
		const filteredItems = filterItems(data, filter, contains);

		setDisplayData(filteredItems);
	}, [filter, contains]);

	const MenuItemComponent = ({
		label,
		prop,
		value,
	}: MenuItemComponentType<FilterOptions<Transaction>>) => {
		return (
			<MenuItem filters={filterState} prop={prop} value={value}>
				<Flex direction="row" align="center" justify="space-between" gap="xxs">
					<Text fz="sm">{label}</Text>
					<Text c={colors.text.secondary} fz="xxs" lh="xxs">
						{getNumberOfItemsByPropValue(data, prop, value)}
					</Text>
				</Flex>
			</MenuItem>
		);
	};

	return (
		<>
			<Menu.Item
				onClick={() => {
					setContains(!contains);
				}}
				leftSection={<Switch onChange={() => setContains((prev) => !prev)} checked={contains} />}
			>
				{contains ? 'Contém' : 'Não contém'}
			</Menu.Item>

			{Object.values(getMenuItemsData(dataProvider.values)).map((entry: any) => {
				const values = entry.items as MenuItemComponentType<FilterOptions<Transaction>>[];
				const group = entry.group;
				return (
					<Box key={group + values.length}>
						{group && (
							<>
								<Menu.Divider />
								<Menu.Label>{group}</Menu.Label>
							</>
						)}

						{values.map((value) => {
							return (
								<MenuItemComponent
									key={value.prop + value.label}
									label={value.label}
									prop={value.prop}
									value={value.value}
								/>
							);
						})}
					</Box>
				);
			})}
		</>
	);
}
