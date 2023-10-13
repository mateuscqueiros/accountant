import { DataContext } from '@/providers/DataProvider';
import { Menu, Switch } from '@mantine/core';
import { useContext, useState } from 'react';
import { MenuItem } from './MenuItem';

interface FilterDataModalProps {
	state: boolean;
	setOpened: () => void;
}

export function FilterDataMenu({ state, setOpened }: FilterDataModalProps) {
	const dataProvider = useContext(DataContext);
	const categories = dataProvider.values.user.categories;
	const [contains, setContains] = useState(true);

	const filterOptions = [
		{
			type: ['monthly', 'fixed'],
			categoryId: [1, 2, 3],
		},
	];

	return (
		<>
			<Menu.Dropdown>
				<Menu.Item
					onClick={() => setContains(!contains)}
					leftSection={<Switch defaultChecked={contains} checked={contains} />}
				>
					{contains ? 'Contém' : 'Não contém'}
				</Menu.Item>

				<Menu.Label>Tipo</Menu.Label>
				<MenuItem>Receita</MenuItem>
				<MenuItem>Despesa</MenuItem>

				<Menu.Divider />

				<Menu.Label>Categorias</Menu.Label>
				{categories.map((category) => {
					const label = category.label;
					const id = category.id;
					return <MenuItem key={label + id}>{label}</MenuItem>;
				})}
			</Menu.Dropdown>
		</>
	);
}
