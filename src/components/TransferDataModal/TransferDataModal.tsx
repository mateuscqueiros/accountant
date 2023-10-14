import { compareStartOfMonth } from '@/lib/dates';
import { DataContext } from '@/providers/DataProvider';
import { ModalsContext } from '@/providers/ModalsProvider';
import { Transaction } from '@/types/data/data.types';
import { TransferDataForm } from '@/types/forms/forms.types';
import {
	Box,
	Button,
	Checkbox,
	Flex,
	Group,
	Modal,
	NumberInput,
	Select,
	Text,
	Tooltip,
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconArrowRight, IconTransfer } from '@tabler/icons-react';
import { format, startOfMonth, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { ActionIcon } from '../Icons';

export function TransferDataModal() {
	const data = useContext(DataContext);
	const modal = useContext(ModalsContext).transferData;

	const initialValues: TransferDataForm = {
		date: startOfMonth(new Date(subMonths(new Date(), 1).toString())),
		fixed: true,
		installments: true,
		monthly: false,
		transform: 0,
		action: 'add',
	};

	const transferDataForm = useForm<TransferDataForm>({
		initialValues,
		transformValues: (values): TransferDataForm => ({
			...values,
			transform: typeof values.transform !== 'number' ? 0 : values.transform,
		}),
	});

	let calculateSumOfSelectedItems = useCallback(
		(data: Transaction[] | undefined, form: TransferDataForm) => {
			let sum = 0;
			if (data) {
				data.filter((item) => {
					if (form.fixed && item.type === 'fixed') {
						sum++;
					}
					if (form.monthly && item.type === 'monthly') {
						sum++;
					}
					if (form.installments && item.type === 'installment') {
						sum++;
					}
				});
			}
			return sum;
		},
		[]
	);

	let findData = useCallback(
		(date: Date) => {
			let dataToImport = data.values.items.filter((billItem) =>
				compareStartOfMonth(billItem.date, date)
			);

			if (dataToImport.length > 0) {
				return dataToImport;
			}
		},
		[data]
	);

	let dataToImport = useMemo(() => {
		return findData(new Date(transferDataForm.values.date));
	}, [transferDataForm, findData]);

	let sumOfSelectedItems = useMemo(() => {
		return calculateSumOfSelectedItems(dataToImport, transferDataForm.values);
	}, [dataToImport, transferDataForm, calculateSumOfSelectedItems]);

	const handleSubmit = useCallback(
		(values: TransferDataForm) => {
			data.transferData({
				from: new Date(values.date),
				to: data.values.activeMonth,
				fixed: values.fixed,
				installments: values.installments,
				monthly: values.monthly,
				transform: values.transform,
				action: values.action === 'replace' ? 'replace' : 'add',
			});
			modal.close();
			modal.reset();
		},
		[data]
	);

	const updateForm = useCallback(
		(values: TransferDataForm) => {
			transferDataForm.setValues({
				...values,
			});
		},
		[transferDataForm]
	);

	useEffect(() => {
		updateForm(modal.values.command);
	}, [modal]);

	return (
		<>
			<Modal
				aria-label="Importar dados de outro mês"
				size="sm"
				title={
					<Flex fw={600} direction="row" align="center">
						<Text mr={10}>
							{format(new Date(transferDataForm.values.date), "MMMM' de 'yyyy", {
								locale: ptBR,
							}).replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
						</Text>
						<IconArrowRight size="1rem" />
						<Text ml={10}>
							{format(new Date(data.values.activeMonth), "MMMM' de 'yyyy", {
								locale: ptBR,
							}).replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
						</Text>
					</Flex>
				}
				opened={modal.values.opened}
				onClose={() => {
					modal.close();
					modal.reset();
				}}
			>
				<Box mih={300}>
					<form onSubmit={transferDataForm.onSubmit((values) => handleSubmit(values))}>
						<MonthPickerInput
							label="Importar de"
							placeholder="Escolha a data"
							mx="auto"
							mb="md"
							maw={400}
							getYearControlProps={(date) => {
								let isSameYear = date.getFullYear() === new Date().getFullYear();

								if (isSameYear) {
									return {
										style: (theme) => ({
											color: theme.primaryColor,
											fontWeight: 700,
										}),
									};
								}

								return {};
							}}
							getMonthControlProps={(date) => {
								const obj = { disabled: false };
								let isSameYear =
									date.getFullYear() === new Date(data.values.activeMonth).getFullYear();
								let isSameMonth = date.getMonth() === new Date(data.values.activeMonth).getMonth();

								// Se não houver dados para certo mês
								const someBillData = data.values.items.some(
									(billItem) =>
										date.getMonth() === new Date(billItem.date).getMonth() &&
										date.getFullYear() === new Date(billItem.date).getFullYear()
								);

								if (!someBillData) {
									obj.disabled = true;
								}

								if (isSameYear && isSameMonth) {
									return {
										style: (theme) => ({
											color: theme.colors.blue[6],
											fontWeight: 700,
										}),
										disabled: true,
									};
								}

								return obj;
							}}
							{...transferDataForm.getInputProps('date')}
							value={
								new Date(!transferDataForm.values.date ? new Date() : transferDataForm.values.date)
							}
							onChange={(e) => {
								transferDataForm.setFieldValue('date', e ? e : new Date());
							}}
						/>
						<Select
							mb="md"
							label="Ação"
							data={[
								{ label: 'Substituir', value: 'replace' },
								{ label: 'Adicionar', value: 'add' },
							]}
							{...transferDataForm.getInputProps('action')}
						/>
						{dataToImport ? (
							<>
								<Flex mb="md" align="center" justify="space-between">
									<Text mr={10} fz="lg" fw={600}>
										Tipos
									</Text>
									<Text fz="xs" lh="0.1rem" mt={1} color="gray.6">
										({sumOfSelectedItems} itens)
									</Text>
								</Flex>

								<Flex align="center">
									<Checkbox
										checked={transferDataForm.values.fixed}
										size="md"
										label="Fixas"
										fz="lg"
										{...transferDataForm.getInputProps('fixed')}
									/>
									<Text fz="xs" lh="0.1rem" ml={10} color="gray.6">
										(
										{
											dataToImport.filter((item) => {
												return item.type === 'fixed';
											}).length
										}{' '}
										itens)
									</Text>
								</Flex>

								<Group justify="space-between">
									<Flex align="center">
										<Checkbox
											checked={transferDataForm.values.installments}
											size="md"
											label="Parceladas"
											{...transferDataForm.getInputProps('installments')}
										/>
										<Text fz="xs" lh="0.1rem" ml={10} color="gray.6">
											(
											{
												dataToImport.filter((item) => {
													return item.type === 'installment';
												}).length
											}{' '}
											itens)
										</Text>
									</Flex>

									<Tooltip
										label="Adicione um número aqui para adicionar/subtrair das parcelas importadas"
										multiline
										maw={200}
									>
										<NumberInput
											disabled={!transferDataForm.values.installments}
											placeholder="Transformar"
											h={50}
											maw={120}
											mt={10}
											{...transferDataForm.getInputProps('transform')}
											value={
												transferDataForm.values.installments ? transferDataForm.values.transform : 0
											}
										/>
									</Tooltip>
								</Group>
								<Flex mb="md" align="center">
									<Checkbox
										checked={transferDataForm.values.monthly}
										size="md"
										label="Mensais"
										{...transferDataForm.getInputProps('monthly')}
									/>
									<Text fz="xs" lh="0.1rem" ml={10} color="gray.6">
										(
										{
											dataToImport.filter((item) => {
												return item.type === 'monthly';
											}).length
										}{' '}
										itens)
									</Text>
								</Flex>

								<Group justify="flex-end">
									<Button
										onClick={() => {
											modal.close();
										}}
										variant="outline"
									>
										Cancelar
									</Button>
									<Button
										type="submit"
										disabled={!transferDataForm.values.date || sumOfSelectedItems < 1}
									>
										Importar
									</Button>
								</Group>
							</>
						) : (
							<Text>Sem dados para a data selecionada</Text>
						)}
					</form>
				</Box>
			</Modal>

			<ActionIcon onClick={() => modal.open()} size="2.1rem" variant="default">
				<IconTransfer size="1.3rem" />
			</ActionIcon>
		</>
	);
}
