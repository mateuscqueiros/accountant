import { DataContext } from '@/providers/DataProvider';
import { Category } from '@/types/Data';
import { ActionIcon, ColorSwatch, Table, Text, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';
import { useContext } from 'react';
import { CategoriesModalContext } from '../Categories';
import classes from './CategoryItem.module.css';

type CategoryItemProps = {
	category: Category;
	deleteItem: (id: number) => void;
};

export const CategoryItem = ({ category, deleteItem }: CategoryItemProps) => {
	const categoriesModalCtx = useContext(CategoriesModalContext);
	const data = useContext(DataContext);

	const openModal = () => {
		return modals.openConfirmModal({
			title: `Deseja deletar a categoria ${category.label}?`,
			children: (
				<Text size="sm">
					Todos os itens com esta categoria serão transferidos para a categoria
					{data.values.user.categories.filter((category) => category.default)[0].label}
				</Text>
			),
			labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
			onCancel: () => undefined,
			onConfirm: () => deleteItem(category.id),
		});
	};

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
					<ColorSwatch color={`var(--mantine-color-${category.color}`} />
				</Table.Td>
				<Table.Td>
					{!category.default && (
						<Tooltip label="Deletar categoria">
							<ActionIcon
								size="2.2rem"
								role="button-delete"
								variant="transparent"
								color="red"
								onClick={openModal}
							>
								<IconTrash size="1rem" />
							</ActionIcon>
						</Tooltip>
					)}
				</Table.Td>
			</Table.Tr>
		</>
	);
};
