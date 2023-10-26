import { sortCategories } from '@/lib/categories';
import { useColors } from '@/lib/theme';
import { DataContext } from '@/providers/DataProvider';
import { Category } from '@/types/data';
import {
	Box,
	Button,
	ColorSwatch,
	Group,
	Modal,
	Stack,
	Table,
	Text,
	TextInput,
	parseThemeColor,
	useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { ColorSwatchInput } from '../ColorSwatchInput/ColorSwatchInput';
import { CategoryItem } from './CategoryItem/CategoryItem';

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
				action: action || 'add',
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
				action: 'add',
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
		categoryCtx.reset();
	};

	const theme = useMantineTheme();
	const parsedColor = parseThemeColor({ color: 'violet.9', theme });
	const colors = useColors();

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
					<ColorSwatch color={parsedColor.color} />
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
						{colors.input.map((inputColor) => (
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
		<>
			<Box w="100%">
				<Table>
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
			<CategoryModal />
		</>
	);
}
