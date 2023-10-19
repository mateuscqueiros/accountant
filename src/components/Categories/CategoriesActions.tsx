import { sortCategories } from '@/lib/categories';
import { DataContext } from '@/providers/DataProvider';
import { Category } from '@/types/data';
import { Box, Button, Group, Modal, Stack, Table, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { AddCategory } from './AddCategory/AddCategory';
import { CategoryItem } from './CategoryItem/CategoryItem';
import { ColorSwatchInput } from './ColorSwatchInput/ColorSwatchInput';

interface CategoriesModalContext {
	openModal: (action?: CategoriesModalContext['action']) => void;
	closeModal: () => void;
	reset: () => void;
	setValues: (category: Category) => void;
	opened: boolean;
	action: 'edit' | 'add';
	values: Category;
}

export const CategoriesModalContext = createContext<CategoriesModalContext>(
	{} as CategoriesModalContext
);

export function CategoriesModalProvider({ children }: PropsWithChildren) {
	const openModal = (action?: CategoriesModalContext['action']) => {
		setData((prev) => {
			return {
				...prev,
				opened: true,
				action: action || prev.action,
			};
		});
	};

	const closeModal = () => {
		setData((prev) => {
			return {
				...prev,
				opened: false,
			};
		});
	};

	const setValues = (category: Category) => {
		setData((prev) => {
			return {
				...prev,
				values: category,
			};
		});
	};

	const reset = () => {
		setData((prev) => {
			return {
				...prev,
				values: {
					id: -1,
					slug: '',
					label: '',
					color: '',
				},
			};
		});
	};

	const [data, setData] = useState<CategoriesModalContext>({
		openModal,
		closeModal,
		setValues,
		reset,
		opened: false,
		action: 'edit',
		values: {
			id: -1,
			slug: '',
			label: '',
			color: '',
		},
	});

	return <CategoriesModalContext.Provider value={data}>{children}</CategoriesModalContext.Provider>;
}

function CategoryModal() {
	const categoryCtx = useContext(CategoriesModalContext);
	const data = useContext(DataContext);

	const form = useForm<Category>({
		initialValues: {
			id: -1,
			slug: '',
			label: '',
			color: '',
		},
		validate: {
			label: (value) => (value.length < 2 ? 'O nome deve ter mais de 2 caracteres' : null),
			color: (value) => (!value ? 'Selecione uma cor' : null),
		},
		transformValues: (values) => ({
			...values,
			slug: values.label.toLowerCase(),
		}),
	});

	useEffect(() => {
		if (categoryCtx.opened) {
			form.setValues(categoryCtx.values);
		} else {
			form.reset();
		}
	}, [categoryCtx]);

	const handleSubmit = (values: Category) => {
		if (categoryCtx.action === 'add') {
			data.category.add(values);
		} else if (categoryCtx.action === 'edit') {
			data.category.edit(values);
		}
	};

	const inputColors = [
		'red.6',
		'pink.6',
		'violet.6',
		'indigo.6',
		'blue.6',
		'cyan.6',
		'teal.6',
		'green.6',
		'lime.6',
		'yellow.6',
		'orange.6',
	];

	return (
		<Modal
			title={categoryCtx.action === 'edit' ? 'Editar categoria' : 'Criar categoria'}
			opened={categoryCtx.opened}
			onClose={() => {
				categoryCtx.closeModal();
				categoryCtx.reset();
				form.reset();
			}}
		>
			<form
				onSubmit={form.onSubmit((values) => {
					categoryCtx.closeModal();
					categoryCtx.reset();
					handleSubmit(values);
				})}
			>
				<Stack>
					{form.values.default && (
						<Text fz="sm">
							Esta é a categoria padrão. Quando outras categorias são deletadas seus itens são
							transferidos para ela.
						</Text>
					)}
					<TextInput placeholder="Digite um nome" label="Nome" {...form.getInputProps('label')} />
					<Group>
						<Text fz="sm" fw="bold">
							Cor
						</Text>
						{form.errors.color && (
							<Text fz="xs" c="red">
								(Selecione uma cor)
							</Text>
						)}
					</Group>

					<Group gap="xs">
						{inputColors.map((inputColor) => (
							<ColorSwatchInput
								key={inputColor}
								color={inputColor}
								setColor={(color: string) => form.setFieldValue('color', color)}
								selected={form.values.color}
							/>
						))}
					</Group>
				</Stack>
				<Group mt="lg" justify="flex-end">
					<Button
						variant="outline"
						onClick={() => {
							categoryCtx.closeModal();
							form.reset();
						}}
					>
						Cancelar
					</Button>
					<Button type="submit">Salvar</Button>
				</Group>
			</form>
		</Modal>
	);
}

export function CategoriesActions() {
	const data = useContext(DataContext);

	let sortedCategories = sortCategories(data.values.user.categories);

	return (
		<CategoriesModalProvider>
			<>
				<Box w="100%">
					<Table maw={500}>
						<Table.Thead>
							<Table.Tr>
								<Table.Td fw="bold">Nome</Table.Td>
								<Table.Td fw="bold">Cor</Table.Td>
								<Table.Td></Table.Td>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{sortedCategories.map((category) => (
								<CategoryItem key={category.label} category={category} />
							))}
						</Table.Tbody>
					</Table>
				</Box>
				<AddCategory />
				<CategoryModal />
			</>
		</CategoriesModalProvider>
	);
}
