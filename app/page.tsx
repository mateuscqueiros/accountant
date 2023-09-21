'use client';

import ItemForm from '@/components/ItemForm';
import DefaultTable from '@/components/Tables';
import TransferDataFormModal from '@/components/TransferDataForm';
import { DataContext } from '@/contexts/DataContext';
import ModalsContextProvider, { ModalsContext } from '@/contexts/ModalsContext';
import {
	compareStartOfMonth,
	getCategoriesValues,
	getCategory,
	getPercentageArray,
} from '@/utils/index';
import {
	Box,
	Button,
	Divider,
	Flex,
	Group,
	Modal,
	Paper,
	RingProgress,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { MonthPicker } from '@mantine/dates';
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react';
import { format, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import _ from 'lodash';
import { useContext, useState } from 'react';

export default function Home() {
	const data = useContext(DataContext);
	const modals = useContext(ModalsContext);
	const activeData = data.selectActiveData();

	let expensesTotal = 0;
	let incomeTotal = 0;

	const [monthPickerStateSelect, setMonthPickerStateSelect] = useState(false);
	const [monthPickerStateImport, setMonthPickerStateImport] = useState(false);

	let ringProgressStatistics: any[] | undefined = undefined;

	if (activeData) {
		expensesTotal = activeData
			.filter((item) => item.active && !(item.class === 'recipe'))
			.reduce((partialSum, a) => partialSum + a.value, 0);

		incomeTotal = activeData
			.filter((item) => item.active && item.class === 'recipe')
			.reduce((partialSum, a) => partialSum + a.value, 0);

		if (activeData.length > 0) {
			let categoriesValues = getCategoriesValues(activeData, data.user.categories);
			let categoriesValuesToPercentage = getPercentageArray(
				categoriesValues.map((item) => item.value)
			);
			ringProgressStatistics = categoriesValuesToPercentage.map((item, index) => {
				return {
					value: item,
					tooltip: categoriesValues[index].label,
					color: getCategory(data.user.categories, categoriesValues[index].id).color,
				};
			});
		}
	}

	return (
		<>
			<ModalsContextProvider>
				<Flex justify="space-between" align="center" mb="md">
					<Group
						w="fit-content"
						style={{ cursor: 'pointer' }}
						onClick={() => {
							setMonthPickerStateSelect(!monthPickerStateSelect);
						}}
					>
						<Title order={1}>
							{_.capitalize(
								format(new Date(data.user.activeMonth), "MMMM' de 'yyyy", {
									locale: ptBR,
								})
							)}
						</Title>
						{monthPickerStateSelect ? <IconCaretUpFilled /> : <IconCaretDownFilled />}
					</Group>
					<Modal
						size="sm"
						title="Escolha um mês"
						opened={monthPickerStateSelect}
						onClose={() => setMonthPickerStateSelect(false)}
					>
						<Box w="fit-content" m="0 auto">
							<MonthPicker
								placeholder="01/01/2023"
								value={startOfMonth(new Date(data.user.activeMonth))}
								getYearControlProps={(date) => {
									if (date.getFullYear() === new Date().getFullYear()) {
										return {
											style: (theme) => ({
												fontWeight: 700,
											}),
										};
									}

									return {};
								}}
								getMonthControlProps={(date) => {
									if (
										date.getMonth() === new Date().getMonth() &&
										date.getFullYear() === new Date().getFullYear()
									) {
										return {
											style: (theme) => ({
												fontWeight: 700,
											}),
										};
									}

									if (
										data.items.every(
											(billItem) => !compareStartOfMonth(billItem.date, date.toString())
										)
									) {
										return {
											style: (theme) => ({
												opacity: 0.5,
											}),
										};
									}

									return {};
								}}
								onChange={(e) => {
									data.setActiveMonth(new Date(e ? e.toString() : new Date()).toDateString());
									setMonthPickerStateSelect(false);
								}}
							/>
						</Box>
					</Modal>
					{activeData && (
						<Group>
							<TransferDataFormModal />
							<ItemForm />
						</Group>
					)}
				</Flex>
				{activeData ? (
					<>
						<Paper mb="1rem" p="1rem" px="2rem">
							<Flex justify="space-between">
								<Flex direction="column" justify="center" style={{ gap: 0 }}>
									<Group style={{ gap: 0 }}>
										<Text mr={10}>Saldo mensal:</Text>
										<Text fz="lg" fw={600} color="green.7">
											${(incomeTotal - expensesTotal).toFixed(2)}
										</Text>
									</Group>
									<Group style={{ gap: 0 }}>
										<Text mr={10}>Total de gastos:</Text>
										<Text fz="lg" color="red.5" fw={600}>
											${expensesTotal.toFixed(2)}
										</Text>
									</Group>
								</Flex>
								<RingProgress
									roundCaps
									sections={
										ringProgressStatistics || [
											{
												value: 100,
												color: 'gray',
												tooltip: 'Sem contas',
											},
										]
									}
								/>
							</Flex>
						</Paper>
						<SimpleGrid cols={{ base: 1, md: 2 }}>
							<DefaultTable
								title="Fixas"
								header={['Nome', 'Valor', 'Vencimento']}
								type="fixed"
								itemClass="expense"
							/>
							<DefaultTable
								title="Parceladas"
								header={['Nome', 'Valor', 'Parcelas', 'Vencimento']}
								type="installment"
								itemClass="expense"
							/>
							<DefaultTable
								title="Mensal"
								header={['Nome', 'Valor', 'Dia']}
								type="monthly"
								itemClass="expense"
							/>
							<DefaultTable
								title="Receitas"
								header={['Nome', 'Valor', 'Dia criado', 'Parcelas', 'Vencimento', 'Categorias']}
								itemClass="recipe"
							/>
						</SimpleGrid>
					</>
				) : (
					<Stack>
						<Divider />
						<Text>Sem dados para esse mês.</Text>
						<Group>
							<Button>Olá</Button>
							{data.items.length > 0 && (
								<Button
									onClick={() => {
										modals.transferData.open();
									}}
								>
									Importar
								</Button>
							)}
						</Group>
						<Modal
							aria-label="Escolher mês dos dados"
							size="sm"
							title="Escolha um mês para importar"
							opened={monthPickerStateImport}
							onClose={() => setMonthPickerStateImport(false)}
						>
							<Box w="fit-content" m="0 auto">
								<MonthPicker
									placeholder="01/01/2023"
									defaultValue={startOfMonth(new Date())}
									getMonthControlProps={(date) => {
										const obj = { disabled: false };

										// Se não houver dados para certo mês
										const someBillData = data.items.some(
											(billItem) =>
												date.getMonth() === new Date(billItem.date).getMonth() &&
												date.getFullYear() === new Date(billItem.date).getFullYear() &&
												data.items &&
												data.items.length > 0
										);
										if (!someBillData) {
											obj.disabled = true;
										}

										return obj;
									}}
									onChange={() => {
										setMonthPickerStateImport(false);
									}}
								/>
							</Box>
						</Modal>
					</Stack>
				)}
			</ModalsContextProvider>
		</>
	);
}
