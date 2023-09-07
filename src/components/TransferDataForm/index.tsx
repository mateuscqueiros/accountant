import { selectData, transferData } from '@/store/features/data/dataSlice';
import {
	TransferDataFormValues,
	closeTransferDataModal,
	initialValues,
	openTransferDataModal,
	selectTransferDataModal,
} from '@/store/features/transferDataModal/transferDataModalSlice';
import { useAppDispatch, useAppSelector } from '@/store/index';
import { compareStartOfMonth } from '@/utils/compareStartOfMonth';
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
	Text,
	Tooltip,
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconArrowRight, IconDownload } from '@tabler/icons-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import _ from 'lodash';
import { useCallback, useMemo } from 'react';
import { BillsDataItemType } from 'src/data';

const TransferDataFormModal = () => {
	const data = useAppSelector(selectData);
	const transferDataModal = useAppSelector(selectTransferDataModal);
	const dispatch = useAppDispatch();

	const transferDataForm = useForm<TransferDataFormValues>({
		initialValues,
		transformValues: (values): TransferDataFormValues => ({
			...values,
			transform: typeof values.transform !== 'number' ? 0 : values.transform,
		}),
	});

	let calculateSumOfSelectedItems = useCallback(
		(data: BillsDataItemType[] | undefined, form: TransferDataFormValues) => {
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
		(date: string) => {
			let dataToImport = data.items.filter((billItem) => compareStartOfMonth(billItem.date, date));

			if (dataToImport.length > 0) {
				return dataToImport;
			}
		},
		[data]
	);

	let dataToImport = useMemo(() => {
		return findData(transferDataForm.values.date);
	}, [transferDataForm, findData]);

	let sumOfSelectedItems = useMemo(() => {
		return calculateSumOfSelectedItems(dataToImport, transferDataForm.values);
	}, [dataToImport, transferDataForm, calculateSumOfSelectedItems]);

	const handleSubmit = useCallback(
		(values: TransferDataFormValues) => {
			dispatch(
				transferData({
					from: values.date,
					to: data.user.activeMonth,
					fixed: values.fixed,
					installments: values.installments,
					monthly: values.monthly,
					transform: values.transform,
					action: values.action === 'replace' ? 'replace' : 'add',
				})
			);
			dispatch(closeTransferDataModal());
		},
		[data, dispatch]
	);

	return (
		<>
			<Modal
				aria-label="Importar dados de outro mês"
				size="sm"
				title={
					<Flex fw={600} direction="row" align="center">
						<Text mr={10}>
							{_.capitalize(
								format(new Date(transferDataForm.values.date), "MMMM' de 'yyyy", {
									locale: ptBR,
								})
							)}
						</Text>
						<IconArrowRight size="1rem" />
						<Text ml={10}>
							{_.capitalize(
								format(new Date(data.user.activeMonth), "MMMM' de 'yyyy", {
									locale: ptBR,
								})
							)}
						</Text>
					</Flex>
				}
				opened={transferDataModal.opened}
				onClose={() => {
					dispatch(closeTransferDataModal());
					dispatch(closeTransferDataModal());
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
								if (date.getFullYear() === new Date().getFullYear()) {
									return {
										sx: (theme) => ({
											color: theme.fn.primaryColor(),
											fontWeight: 700,
										}),
									};
								}

								return {};
							}}
							getMonthControlProps={(date) => {
								const obj = { disabled: false };

								// Se não houver dados para certo mês
								const someBillData = data.items.some(
									(billItem) =>
										date.getMonth() === new Date(billItem.date).getMonth() &&
										date.getFullYear() === new Date(billItem.date).getFullYear()
								);

								if (!someBillData) {
									obj.disabled = true;
								}

								if (date.getMonth() === new Date().getMonth()) {
									return {
										sx: (theme) => ({
											color: theme.fn.primaryColor(),
											fontWeight: 700,
										}),
										disabled: true,
									};
								}

								return obj;
							}}
							{...transferDataForm.getInputProps('date')}
							value={
								new Date(
									transferDataForm.values.date === '' ? new Date() : transferDataForm.values.date
								)
							}
							onChange={(e) => {
								transferDataForm.setFieldValue('date', e && e.toString() ? e.toString() : '');
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
										({sumOfSelectedItems} para importar)
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

								<Group position="apart">
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

								<Group position="right">
									<Button
										onClick={() => {
											dispatch(openTransferDataModal());
										}}
										variant="outline"
									>
										Cancelar
									</Button>
									<Button
										type="submit"
										disabled={transferDataForm.values.date === '' || sumOfSelectedItems < 1}
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

			<ActionIcon onClick={() => dispatch(openTransferDataModal())} size="2.1rem" variant="default">
				<IconDownload size="1.3rem" />
			</ActionIcon>
		</>
	);
};

export default TransferDataFormModal;
