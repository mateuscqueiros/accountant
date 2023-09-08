import ItemFormContextProvider from '@/contexts/ItemFormContext';
import { createItem, deleteItem, selectData, updateItem } from '@/store/features/data/dataSlice';
import { ItemFormType, initialValues, setValues } from '@/store/features/itemForm/itemFormSlice';
import {
	openModal,
	resetModal,
	selectItemFormModal,
} from '@/store/features/modalItemForm/itemFormModalSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getTags } from '@/utils/getTags';
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
import { startOfMonth } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddBill = () => {
	const itemFormModal = useAppSelector(selectItemFormModal);
	const dispatch = useAppDispatch();
	const data = useAppSelector(selectData);

	const activeData = data.items.filter((item) => {
		return (
			startOfMonth(new Date(item.date)).toString() ===
			startOfMonth(new Date(data.user.activeMonth)).toString()
		);
	});

	let [tags, setTags] = useState(getTags(activeData));

	let [confirmModal, setConfirmModal] = useState({
		confirmed: false,
		opened: false,
	});

	const theme = useMantineTheme();
	const extraSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const itemForm = useForm<ItemFormType>({
		initialValues: {
			...initialValues,
			fixed: {
				...initialValues.fixed,
			},
			installments: {
				...initialValues.installments,
			},
		},
		validate: getValidateObject(),
		transformValues: (values) => getTransformObject(values),
	});

	const updateForm = useCallback(
		(values: ItemFormType) => {
			itemForm.setValues({
				...values,
				installments: {
					...values.installments,
				},
				fixed: {
					...values.fixed,
				},
			});
		},
		[itemForm]
	);

	useEffect(() => {
		updateForm(itemFormModal.command);
	}, [itemFormModal]);

	const handleSubmit = useCallback(
		(values: ItemFormType) => {
			if (itemFormModal.action === 'update') {
				dispatch(updateItem(sanitizeBeforeCommiting(itemFormModal.updateItem, values)));
				dispatch(resetModal());
			} else {
				itemForm.reset();
				dispatch(resetModal());
				dispatch(setValues(values));
				dispatch(createItem(sanitizeBeforeCommiting(uuidv4(), values)));
			}
		},
		[itemForm, dispatch, itemFormModal]
	);

	return (
		<>
			<ItemFormContextProvider>
				<Modal
					data-testid="modal-form"
					opened={itemFormModal.opened}
					onClose={() => {
						dispatch(resetModal());
					}}
					title={itemFormModal.action === 'create' ? 'Criar item' : 'Atualizar item'}
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
								precision={2}
								parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
								data-testid="input-value"
								formatter={(value) =>
									!Number.isNaN(parseFloat(value))
										? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
										: '$ '
								}
								{...itemForm.getInputProps('value')}
							/>
							<Select
								withAsterisk
								label="Tipo"
								placeholder="Escolha um tipo"
								mb="md"
								role="input-type"
								data={[
									{ value: 'monthly', label: 'Mensal' },
									{ value: 'installment', label: 'Parcelada' },
									{ value: 'fixed', label: 'Fixa' },
								]}
								{...itemForm.getInputProps('type')}
							/>
							{itemForm.values.type === 'installment' && (
								<Flex
									justify="space-between"
									direction={extraSmallScreen ? 'column' : 'row'}
									sx={{ gap: '0.5rem' }}
								>
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
									<NumberInput
										withAsterisk
										label="Vencimento"
										placeholder="Número"
										mb="md"
										role="input-installments-dueDay"
										{...itemForm.getInputProps('installments.dueDay')}
									/>
								</Flex>
							)}
							{itemForm.values.type === 'fixed' && (
								<NumberInput
									withAsterisk
									label="Vencimento"
									placeholder="Dia"
									mb="md"
									role="input-fixed-dueDay"
									{...itemForm.getInputProps('fixed.dueDay')}
								/>
							)}
							<Group sx={{ alignItems: 'center' }}>
								<DateInput
									sx={{ flex: 1 }}
									withAsterisk
									label="Data"
									placeholder="01/01/2023"
									mb="md"
									role="input-date"
									{...itemForm.getInputProps('date')}
									value={new Date(itemForm.values.date === '' ? new Date() : itemForm.values.date)}
									onChange={(e) => {
										itemForm.setFieldValue('date', e && e.toString() ? e.toString() : '');
									}}
								/>
								<Tooltip
									multiline
									label="Define se o item deve ser computado nos cálculos"
									withArrow
								>
									<Checkbox
										mt={10}
										label="Ativo"
										role="input-active"
										checked={itemForm.values.active}
										{...itemForm.getInputProps('active')}
									/>
								</Tooltip>
							</Group>

							<Select
								label="Categoria"
								placeholder="Selecione etiquetas"
								mb="md"
								role="input-installments-tags"
								data={tags}
								searchable
								creatable
								getCreateLabel={(query) => `+ Criar ${query}`}
								onCreate={(query) => {
									setTags((prev) => [...prev, query]);
									return query;
								}}
								{...itemForm.getInputProps('tag')}
							/>
							<Textarea
								label="Notas"
								mb="md"
								placeholder="Descreva o item"
								autosize
								role="input-installments-notes"
								{...itemForm.getInputProps('notes')}
								value={itemForm.values.note}
								onChange={(e) => itemForm.setFieldValue('note', e.currentTarget.value)}
							/>
							<Flex justify="space-between" mt="xl">
								{/* <Button variant="outline" onClick={() => {
                                form.validate()
                            }}>Validar</Button> */}
								{/* <Button variant="outline" onClick={() => {
                                form.reset()
                            }}>Resetar</Button> */}
								{itemFormModal.action === 'update' && (
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
								<Group>
									<Button
										variant="outline"
										role="button-cancel"
										onClick={() => {
											itemForm.reset();
											itemForm.clearErrors();
											itemForm.resetDirty();
											itemForm.resetTouched();
											dispatch(resetModal());
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
							dispatch(resetModal());
							dispatch(openModal());
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
					<Stack sx={{ gap: 0 }}>
						<Text mb="1.5rem" mt="0.5rem">
							Deseja realmente deletar?
						</Text>
						<Group position="right">
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
									dispatch(deleteItem(itemFormModal.updateItem));
									dispatch(resetModal());
								}}
							>
								Confirmar
							</Button>
						</Group>
					</Stack>
				</Modal>
			</ItemFormContextProvider>
		</>
	);
};

export default AddBill;
