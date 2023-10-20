import { ActionDeleteCategory } from '@/components/Actions/Categories';
import { Category } from '@/types/data';
import { ColorSwatch, Table, Text, parseThemeColor, useMantineTheme } from '@mantine/core';
import { useContext } from 'react';
import { CategoriesModalContext } from '../CategoriesActions';
import classes from './CategoryItem.module.css';

type CategoryItemProps = {
	category: Category;
};

export const CategoryItem = ({ category }: CategoryItemProps) => {
	const categoriesModalCtx = useContext(CategoriesModalContext);
	const theme = useMantineTheme();

	const categoryColor = parseThemeColor({ color: category.color, theme }).color;

	return (
		<>
			<Table.Tr className={classes.item} w="100%" px="md" py="sm">
				<Table.Td
					onClick={() => {
						categoriesModalCtx.openModal('edit');
						categoriesModalCtx.setValues(category);
					}}
				>
					<Text fw={category.default ? 'bold' : undefined}>{category.label}</Text>
				</Table.Td>
				<Table.Td
					onClick={() => {
						categoriesModalCtx.openModal('edit');
						categoriesModalCtx.setValues(category);
					}}
				>
					<ColorSwatch color={categoryColor} />
				</Table.Td>
				<Table.Td>{!category.default && <ActionDeleteCategory category={category} />}</Table.Td>
			</Table.Tr>
		</>
	);
};
