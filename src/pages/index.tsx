import AddBill from '@/components/AddBill';
import Layout from '@/components/Layout';
import DefaultTable from '@/components/Tables';
import TransferDataFormModal from '@/components/TransferDataForm';
import { DataContext } from '@/contexts/DataContext';
import ModalsContextProvider, { ModalsContext } from '@/contexts/ModalsContext';
import { compareStartOfMonth, getCategoriesValues, getPercentageArray } from '@/utils/index';
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
	useMantineColorScheme,
} from '@mantine/core';
import { MonthPicker } from '@mantine/dates';
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react';
import { format, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import _ from 'lodash';
import Head from 'next/head';
import { useContext, useState } from 'react';

export default function Home() {
	const data = useContext(DataContext);
	const modals = useContext(ModalsContext);
	const activeData = data.selectActiveData();
	const { colorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	let expensesTotal = 0;
	let incomeTotal = 0;

	const [monthPickerStateSelect, setMonthPickerStateSelect] = useState(false);
	const [monthPickerStateImport, setMonthPickerStateImport] = useState(false);

	const statisticsColors = ['cyan', 'orange', 'grape', 'teal', 'blue', 'yellow', 'orange', 'red'];
	let ringProgressStatistics: any[] | undefined;

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
					color: statisticsColors[index],
				};
			});
		}
	}

	return (
		<>
			<Head>
				<title>Contas</title>
				<meta name="description" content="Aplicação para gerenciar contas financeiras" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<ModalsContextProvider>
					<Flex justify="space-between" align="center" mb="md">
						<Group
							w="fit-content"
							sx={{ cursor: 'pointer' }}
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
									defaultValue={startOfMonth(new Date(data.user.activeMonth))}
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
										if (
											date.getMonth() === new Date().getMonth() &&
											date.getFullYear() === new Date().getFullYear()
										) {
											return {
												sx: (theme) => ({
													color: theme.fn.primaryColor(),
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
												sx: (theme) => ({
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
								<AddBill />
							</Group>
						)}
					</Flex>
					{activeData ? (
						<>
							<Paper mb="1rem" p="1rem" px="2rem">
								<Flex justify="space-between">
									<Flex direction="column" justify="center" sx={{ gap: 0 }}>
										<Group sx={{ gap: 0 }}>
											<Text mr={10}>Saldo mensal:</Text>
											<Text fz="lg" fw={600} color="green.7">
												${(incomeTotal - expensesTotal).toFixed(2)}
											</Text>
										</Group>
										<Group sx={{ gap: 0 }}>
											<Text mr={10}>Total de gastos:</Text>
											<Text fz="lg" color="red.5" fw={600}>
												${expensesTotal.toFixed(2)}
											</Text>
										</Group>
									</Flex>
									<RingProgress
										sections={
											ringProgressStatistics
												? ringProgressStatistics
												: [
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
							<SimpleGrid
								breakpoints={[
									{ minWidth: 0, cols: 1 },
									{ minWidth: 1000, cols: 2 },
									{ minWidth: 1300, cols: 3 },
									{ minWidth: 1700, cols: 4 },
								]}
							>
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
									header={['Nome', 'Valor', 'Dia criado', 'Parcelas', 'Vencimento']}
									itemClass="recipe"
								/>
							</SimpleGrid>
						</>
					) : (
						<Stack>
							<Divider />
							<Text>Sem dados para esse mês.</Text>
							<Group>
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
			</Layout>
		</>
	);
}
