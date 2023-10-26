import { itemFormInitialValues as initialValues } from '@/consts/forms';
import { getCategoriesForm } from '@/lib/categories';
import { getTransformObject, getValidateObject, sanitizeBeforeCommiting } from '@/lib/form';
import { confirmModal } from '@/lib/modals';
import { getWalletsForm } from '@/lib/wallets';
import { DataContext } from '@/providers/DataProvider';
import { ModalsContext } from '@/providers/ModalsProvider';
import { ItemForm } from '@/types/forms/forms.types';
import {
	Box,
	Button,
	Checkbox,
	Flex,
	Group,
	Modal,
	NumberInput,
	Select,
	TextInput,
	Textarea,
	Tooltip,
	useMantineTheme,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useCallback, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ActionIcon, IconDelete } from '../Icons';

export function ItemsForm() {
	const modal = useContext(ModalsContext).item;
	const data = useContext(DataContext);
	const categories = data.values.user.categories;
	const wallets = data.values.user.wallets;

	const theme = useMantineTheme();
	const extraSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const itemForm = useForm<ItemForm>({
		initialValues,
		validate: getValidateObject(),
		transformValues: (values) => getTransformObject(values),
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
				const sanitizedItem = sanitizeBeforeCommiting(modal.values.updateItem, values);
				data.item.update(sanitizedItem);
				modal.reset();
			} else {
				const sanitizedItem = sanitizeBeforeCommiting(uuidv4(), values);
				itemForm.reset();
				modal.reset();
				data.item.create(sanitizedItem);
			}
		},
		[itemForm, modal]
	);

	return (
		<>
			<Modal
				opened={modal.values.opened}
				onClose={() => {
					modal.reset();
				}}
				title={modal.values.action === 'create' ? 'Criar item' : 'Atualizar item'}
			>
				<Box p="1rem" pt={0}>
					<form
						onSubmit={itemForm.onSubmit((values) => {
							handleSubmit(values);
						})}
					>
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
								value={new Date(!itemForm.values.date ? new Date() : itemForm.values.date)}
								onChange={(e) => {
									itemForm.setFieldValue('date', e && e ? e : new Date());
								}}
							/>
							<Tooltip multiline label="Define se o item deve ser computado nos cálculos" withArrow>
								<Checkbox
									mt={10}
									label="Ativo"
									checked={itemForm.values.active}
									{...itemForm.getInputProps('active')}
								/>
							</Tooltip>
						</Group>

						<Select
							label="Categoria"
							placeholder="Selecione a categoria"
							mb="md"
							data={getCategoriesForm(categories)}
							// itemComponent={SelectItem}
							searchable
							allowDeselect={false}
							checkIconPosition="right"
							{...itemForm.getInputProps('categoryId')}
						/>
						<Select
							label="Carteira"
							placeholder="Selecione a carteira"
							mb="md"
							data={getWalletsForm(wallets)}
							// itemComponent={SelectItem}
							searchable
							allowDeselect={false}
							checkIconPosition="right"
							{...itemForm.getInputProps('walletId')}
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
								<>
									<ActionIcon
										size="2.2rem"
										variant="outline"
										color="red"
										onClick={() => {
											confirmModal({
												title: `Deseja deletar este item?`,
												onConfirm: () => {
													data.item.delete(modal.values.updateItem);
													modal.close();
												},
											});
										}}
									>
										<IconDelete size="1rem" />
									</ActionIcon>
								</>
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
								<Button type="submit">Salvar</Button>
							</Group>
						</Flex>
					</form>
				</Box>
			</Modal>
		</>
	);
}
