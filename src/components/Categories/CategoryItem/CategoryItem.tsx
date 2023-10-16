import { ActionIcon } from '@/components/Icons';
import { confirmModal } from '@/lib/modals';
import { DataContext } from '@/providers/DataProvider';
import { Category } from '@/types/data';
import { ColorSwatch, Table, Text, Tooltip, parseThemeColor, useMantineTheme } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useContext } from 'react';
import { CategoriesModalContext } from '../CategoriesActions';
import classes from './CategoryItem.module.css';

type CategoryItemProps = {
	category: Category;
};

export const CategoryItem = ({ category }: CategoryItemProps) => {
	const categoriesModalCtx = useContext(CategoriesModalContext);
	const data = useContext(DataContext);
	const theme = useMantineTheme();

	const confirmDelete = (e: any) => {
		e.stopPropagation();
		confirmModal({
			title: 'Deseja deletar a categoria?',
			onConfirm: () => data.category.delete(category.id),
		});
	};

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
					<Text fw={category.default ? 'bold' : undefined}>
						{category.label}
						{}
					</Text>
				</Table.Td>
				<Table.Td
					onClick={() => {
						categoriesModalCtx.openModal('edit');
						categoriesModalCtx.setValues(category);
					}}
				>
					<ColorSwatch color={categoryColor} />
				</Table.Td>
				<Table.Td>
					{!category.default && (
						<Tooltip label="Deletar categoria">
							<ActionIcon variant="subtle" color="red" onClick={confirmDelete}>
								<IconTrash size="1rem" />
							</ActionIcon>
						</Tooltip>
					)}
				</Table.Td>
			</Table.Tr>
		</>
	);
};