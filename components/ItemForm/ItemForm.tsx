import { itemFormInitialValues as initialValues } from '@/consts/Forms/forms.consts';
import { DataContext } from '@/contexts/DataContext/DataContext';
import { ModalsContext } from '@/contexts/ModalsContext/ModalsContext';
import { getCategoriesForm } from '@/utils/categories';
import {
	getTransformObject,
	getValidateObject,
	sanitizeBeforeCommiting,
} from '@/utils/sanitizeForm';
import {
	ActionIcon,
	Box,
	Button,
	Checkbox,
	Flex,
	Group,
	Modal,
	NumberInput,
	Select,
	Stack,
	Text,
	TextInput,
	Textarea,
	Tooltip,
	useMantineTheme,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ItemForm } from 'src/types/Forms/forms.types';
import { v4 as uuidv4 } from 'uuid';

export function ItemsForm() {
	const modal = useContext(ModalsContext).item;
	const data = useContext(DataContext);

	let [confirmModal, setConfirmModal] = useState({
		confirmed: false,
		opened: false,
	});

	const theme = useMantineTheme();
	const extraSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const itemForm = useForm<ItemForm>({
		initialValues,
		validate: getValidateObject(),
		transformValues: (values) => getTransformObject(values, data.values.user.categories),
	});

	const updateForm = useCallback(
		(values: ItemForm) => {
			itemForm.setValues({
				...values,
			});
		},
		[itemForm]
	);

	useEffect(() => {
		updateForm(modal.values.command);
	}, [modal]);

	const handleSubmit = useCallback(
		(values: ItemForm) => {
			if (modal.values.action === 'update') {
				data.item.update(
					sanitizeBeforeCommiting(modal.values.updateItem, values, data.values.user.categories)
				);
				modal.reset();
			} else {
				itemForm.reset();
				modal.reset();
				data.item.create(sanitizeBeforeCommiting(uuidv4(), values, data.values.user.categories));
			}
		},
		[itemForm, modal]
	);

	return (
		<>
			<Modal
				data-testid="modal-form"
				opened={modal.values.opened}
				onClose={() => {
					modal.reset();
				}}
				title={modal.values.action === 'create' ? 'Criar item' : 'Atualizar item'}
			>
				<Box p="1rem" pt={0}>
					<form onSubmit={itemForm.onSubmit((values) => handleSubmit(values))}>
						<TextInput
							withAsterisk
							label="Nome"
							placeholder="Nome do item"
							mb="md"
							data-testid="input-name"
							{...itemForm.getInputProps('label')}
						/>
						<NumberInput
							withAsterisk
							label="Valor"
							placeholder="$ 5,00"
							mb="md"
							decimalScale={2}
							data-testid="input-value"
							{...itemForm.getInputProps('value')}
						/>
						<Flex gap="sm" mb="md">
							<Select
								withAsterisk
								label="Tipo"
								placeholder="Escolha um tipo"
								data={[
									{ value: 'monthly', label: 'Mensal' },
									{ value: 'installment', label: 'Parcelada' },
									{ value: 'fixed', label: 'Fixa' },
								]}
								{...itemForm.getInputProps('type')}
							/>
							<Select
								withAsterisk
								label="Classe"
								placeholder="Escolha uma classe"
								data={[
									{ value: 'expense', label: 'Despesa' },
									{ value: 'recipe', label: 'Receita' },
								]}
								{...itemForm.getInputProps('class')}
							/>
						</Flex>
						<Flex
							justify="space-between"
							direction={extraSmallScreen ? 'column' : 'row'}
							style={{ gap: '0.5rem' }}
						>
							{itemForm.values.type === 'installment' && (
								<>
									<NumberInput
										withAsterisk
										label="Parcela atual"
										placeholder="Menor que o total"
										mb="md"
										role="input-installments-current"
										{...itemForm.getInputProps('installments.current')}
									/>
									<NumberInput
										withAsterisk
										label="Total de parcelas"
										placeholder="Número"
										mb="md"
										role="input-installments-total"
										{...itemForm.getInputProps('installments.total')}
									/>
								</>
							)}
							{(itemForm.values.type === 'fixed' || itemForm.values.type === 'installment') && (
								<NumberInput
									withAsterisk
									w={itemForm.values.type === 'fixed' ? '100%' : undefined}
									label="Vencimento"
									placeholder="Dia"
									mb="md"
									{...itemForm.getInputProps('dueDay')}
								/>
							)}
						</Flex>

						<Group style={{ alignItems: 'center' }}>
							<DateInput
								style={{ flex: 1 }}
								withAsterisk
								label="Data"
								placeholder="01/01/2023"
								mb="md"
								{...itemForm.getInputProps('date')}
								value={new Date(itemForm.values.date === '' ? new Date() : itemForm.values.date)}
								onChange={(e) => {
									itemForm.setFieldValue('date', e && e.toString() ? e.toString() : '');
								}}
							/>
							<Tooltip multiline label="Define se o item deve ser computado nos cálculos" withArrow>
								<Checkbox
									mt={10}
									label="Pago"
									checked={itemForm.values.active}
									{...itemForm.getInputProps('active')}
								/>
							</Tooltip>
						</Group>

						<Select
							label="Categoria"
							placeholder="Selecione etiquetas"
							mb="md"
							data={getCategoriesForm(data.values.user.categories)}
							// itemComponent={SelectItem}
							searchable
							allowDeselect={false}
							// getCreateLabel={(query) => `+ Criar ${query}`}
							// onCreate={(query) => {
							// 	const nextId = getNextCategoryId(data.user.categories);
							// 	data.addCategory({
							// 		label: query,
							// 		color: 'gray.6',
							// 	});
							// 	const newCategory = getCategory(data.user.categories, nextId);
							// 	itemForm.setFieldValue('categoryId', String(newCategory && newCategory.id));
							// 	return {
							// 		label: query,
							// 		value: String(nextId),
							// 	};
							// }}
							// filter={(value, item) => {
							// 	return getCategory(data.user.categories, item.id) !== undefined;
							// }}
							{...itemForm.getInputProps('categoryId')}
						/>
						<Textarea
							label="Notas"
							mb="md"
							placeholder="Descreva o item"
							autosize
							{...itemForm.getInputProps('notes')}
							value={itemForm.values.note}
							onChange={(e) => itemForm.setFieldValue('note', e.currentTarget.value)}
						/>
						<Flex justify="space-between" mt="xl">
							{modal.values.action === 'update' && (
								<ActionIcon
									size="2.2rem"
									role="button-delete"
									variant="outline"
									color="red"
									onClick={() => {
										setConfirmModal({ ...confirmModal, opened: true });
									}}
								>
									<IconTrash size="1rem" />
								</ActionIcon>
							)}
							<Group w="100%" justify="flex-end">
								<Button
									variant="outline"
									role="button-cancel"
									onClick={() => {
										itemForm.reset();
										itemForm.clearErrors();
										itemForm.resetDirty();
										itemForm.resetTouched();
										modal.reset();
									}}
								>
									Cancelar
								</Button>
								<Button type="submit" data-testid="button-submit">
									Salvar
								</Button>
							</Group>
						</Flex>
					</form>
				</Box>
			</Modal>

			<Tooltip label="Adicionar conta">
				<ActionIcon
					data-testid="open-modal-form"
					size="2.1rem"
					variant="default"
					onClick={() => {
						itemForm.reset();
						modal.reset();
						modal.open();
					}}
				>
					<IconPlus size="1.3rem" />
				</ActionIcon>
			</Tooltip>

			<Modal
				opened={confirmModal.opened}
				onClose={() => {
					setConfirmModal({
						...confirmModal,
						opened: false,
					});
				}}
				withCloseButton={false}
			>
				<Stack style={{ gap: 0 }}>
					<Text mb="1.5rem" mt="0.5rem">
						Deseja realmente deletar?
					</Text>
					<Group justify="flex-end">
						<Button
							variant="outline"
							onClick={() => {
								setConfirmModal({ opened: false, confirmed: false });
							}}
						>
							Cancelar
						</Button>
						<Button
							onClick={() => {
								setConfirmModal({ opened: false, confirmed: true });
								itemForm.reset();
								data.item.delete(modal.values.updateItem);
								modal.reset();
							}}
						>
							Confirmar
						</Button>
					</Group>
				</Stack>
			</Modal>
		</>
	);
}
