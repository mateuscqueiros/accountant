import {
	createItem,
	deleteItem,
	selectActiveBillsItem,
	updateItem
} from '@/store/features/data/dataSlice'
import {
	FormFields,
	initialValues as initial,
	setValues
} from '@/store/features/form/formSlice'
import {
	openModal,
	resetModal,
	selectModal
} from '@/store/features/modal/modalSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getTags } from '@/utils/getTags'
import {
	getTransformObject,
	getValidateObject,
	sanitizeBeforeCommiting
} from '@/utils/sanitizeForm'
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
	useMantineTheme
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useMediaQuery } from '@mantine/hooks'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

let initialValues: FormFields = {
	...initial,
	installments: {
		...initial.installments
	},
	fixed: {
		...initial.fixed
	}
}

export default function AddBill() {
	const modal = useAppSelector(selectModal)
	const dispatch = useAppDispatch()
	const activeData = useAppSelector(selectActiveBillsItem)

	let [tags, setTags] = useState(getTags(activeData.items))

	let [confirmModal, setConfirmModal] = useState({
		confirmed: false,
		opened: false
	})

	const theme = useMantineTheme()
	const extraSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

	const form = useForm<FormFields>({
		initialValues,
		validate: getValidateObject(),
		transformValues: (values) => getTransformObject(values)
	})

	const handleSubmit = (values: FormFields) => {
		if (modal.action === 'update') {
			dispatch(updateItem(sanitizeBeforeCommiting(modal.updateItem, values)))
			dispatch(resetModal())
		} else {
			form.reset()
			dispatch(resetModal())
			dispatch(setValues(values))
			dispatch(createItem(sanitizeBeforeCommiting(uuidv4(), values)))
		}
	}

	useEffect(() => {
		form.setValues({
			...modal.command,
			installments: {
				...modal.command.installments
			},
			fixed: {
				...modal.command.fixed
			}
		})
	}, [modal.command])

	return (
		<>
			<Modal
				data-testid="modal-form"
				opened={modal.opened}
				onClose={() => {
					dispatch(resetModal())
				}}
				title={modal.action === 'create' ? 'Criar item' : 'Atualizar item'}
			>
				<Box p="1rem" pt={0}>
					<form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
						<TextInput
							withAsterisk
							label="Nome"
							placeholder="Nome do item"
							mb="md"
							data-testid="input-name"
							{...form.getInputProps('label')}
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
							{...form.getInputProps('value')}
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
								{ value: 'fixed', label: 'Fixa' }
							]}
							{...form.getInputProps('type')}
						/>
						{form.values.type === 'installment' && (
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
									{...form.getInputProps('installments.current')}
								/>
								<NumberInput
									withAsterisk
									label="Total de parcelas"
									placeholder="Número"
									mb="md"
									role="input-installments-total"
									{...form.getInputProps('installments.total')}
								/>
								<NumberInput
									withAsterisk
									label="Vencimento"
									placeholder="Número"
									mb="md"
									role="input-installments-dueDay"
									{...form.getInputProps('installments.dueDay')}
								/>
							</Flex>
						)}
						{form.values.type === 'fixed' && (
							<NumberInput
								withAsterisk
								label="Vencimento"
								placeholder="Dia"
								mb="md"
								role="input-fixed-dueDay"
								{...form.getInputProps('fixed.dueDay')}
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
								{...form.getInputProps('date')}
								value={
									new Date(
										form.values.date === '' ? new Date() : form.values.date
									)
								}
								onChange={(e) => {
									form.setFieldValue(
										'date',
										e && e.toString() ? e.toString() : ''
									)
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
									checked={form.values.active}
									{...form.getInputProps('active')}
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
								setTags((prev) => [...prev, query])
								return query
							}}
							{...form.getInputProps('tag')}
						/>
						<Textarea
							label="Notas"
							mb="md"
							placeholder="Descreva o item"
							autosize
							role="input-installments-notes"
							{...form.getInputProps('notes')}
							value={form.values.note}
							onChange={(e) =>
								form.setFieldValue('note', e.currentTarget.value)
							}
						/>
						<Flex justify="space-between" mt="xl">
							{/* <Button variant="outline" onClick={() => {
                                form.validate()
                            }}>Validar</Button> */}
							{/* <Button variant="outline" onClick={() => {
                                form.reset()
                            }}>Resetar</Button> */}
							{modal.action === 'update' && (
								<ActionIcon
									size="2.2rem"
									role="button-delete"
									variant="outline"
									color="red"
									onClick={() => {
										setConfirmModal({ ...confirmModal, opened: true })
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
										form.reset()
										form.clearErrors()
										form.resetDirty()
										form.resetTouched()
										dispatch(resetModal())
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
						form.reset()
						dispatch(resetModal())
						dispatch(openModal())
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
						opened: false
					})
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
								setConfirmModal({ opened: false, confirmed: false })
							}}
						>
							Cancelar
						</Button>
						<Button
							onClick={() => {
								setConfirmModal({ opened: false, confirmed: true })
								form.reset()
								dispatch(deleteItem(modal.updateItem))
								dispatch(resetModal())
							}}
						>
							Confirmar
						</Button>
					</Group>
				</Stack>
			</Modal>
		</>
	)
}
