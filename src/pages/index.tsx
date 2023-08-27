import Layout from '@/components/Layout'
import AddBill from '@/components/Layout/Components/AddBill'
import DefaultTable from '@/components/Tables'
import {
	createBillData,
	selectActiveBillsItem,
	selectData,
	setActiveMonth
} from '@/store/features/data/dataSlice'
import { useAppDispatch, useAppSelector } from '@/store/index'
import { getPercentageArray, getTagsAndValues } from '@/utils/index'
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
	useMantineColorScheme
} from '@mantine/core'
import { MonthPicker } from '@mantine/dates'
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react'
import { format, startOfMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import _ from 'lodash'
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
	const dispatch = useAppDispatch()
	const data = useAppSelector(selectData)
	const activeData = useAppSelector(selectActiveBillsItem)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	let expensestotal
	let tagsAndValues: Array<any> = []
	const [monthPickerState, setMonthPickerState] = useState(false)
	const [monthPickerStateImport, setMonthPickerStateImport] = useState(false)
	const statisticsColors = [
		'cyan',
		'orange',
		'grape',
		'teal',
		'blue',
		'yellow',
		'orange',
		'red'
	]
	let ringProgressStatistics

	if (activeData) {
		expensestotal = activeData.items
			.filter((item) => item.active)
			.reduce((partialSum, a) => partialSum + a.value, 0)
		tagsAndValues = getTagsAndValues(activeData.items)
		ringProgressStatistics = getPercentageArray(
			tagsAndValues.map((item) => item.value)
		).map((item, index) => ({
			value: item,
			color: statisticsColors[index],
			tooltip: tagsAndValues[index].label
		}))
	}

	return (
		<>
			<Head>
				<title>Contas</title>
				<meta
					name="description"
					content="Aplicação para gerenciar contas financeiras"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<Flex justify="space-between" align="center" mb="md">
					<Group
						w="fit-content"
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							setMonthPickerState(!monthPickerState)
						}}
					>
						<Title order={1}>
							{_.capitalize(
								format(new Date(data.user.activeMonth), "MMMM' de 'yyyy", {
									locale: ptBR
								})
							)}
						</Title>
						{monthPickerState ? <IconCaretUpFilled /> : <IconCaretDownFilled />}
					</Group>
					<Modal
						size="sm"
						title="Escolha um mês"
						opened={monthPickerState}
						onClose={() => setMonthPickerState(!monthPickerState)}
					>
						<Box w="fit-content" m="0 auto">
							<MonthPicker
								placeholder="01/01/2023"
								defaultValue={startOfMonth(new Date())}
								onChange={(e) => {
									dispatch(
										setActiveMonth(
											new Date(e ? e.toString() : new Date()).toDateString()
										)
									)
									setMonthPickerState(false)
								}}
							/>
						</Box>
					</Modal>
					{activeData && <AddBill />}
				</Flex>
				{activeData ? (
					<>
						<Paper mb="1rem" p="1rem" px="2rem">
							<Flex justify="space-between">
								<Flex direction="column" justify="center" sx={{ gap: 0 }}>
									<Group sx={{ gap: 0 }}>
										<Text mr={10}>Saldo mensal:</Text>
										{expensestotal && (
											<Text fz="lg" fw={600} color="green.6">
												${(data.user.income - expensestotal).toFixed(2)}
											</Text>
										)}
									</Group>
									<Group sx={{ gap: 0 }}>
										<Text mr={10}>Total de gastos:</Text>
										{expensestotal && (
											<Text fz="lg" color="red.5" fw={600}>
												${expensestotal.toFixed(2)}
											</Text>
										)}
									</Group>
								</Flex>
								{ringProgressStatistics && (
									<RingProgress sections={ringProgressStatistics} />
								)}
							</Flex>
						</Paper>
						<SimpleGrid
							breakpoints={[
								{ minWidth: 0, cols: 1 },
								{ minWidth: 1000, cols: 2 },
								{ minWidth: 1300, cols: 3 },
								{ minWidth: 1700, cols: 4 }
							]}
						>
							<DefaultTable
								title="Fixas"
								header={['Nome', 'Valor', 'Vencimento']}
								type="fixed"
							/>
							<DefaultTable
								title="Parceladas"
								header={['Nome', 'Valor', 'Parcelas', 'Vencimento']}
								type="installment"
							/>
							<DefaultTable
								title="Mensal"
								header={['Nome', 'Valor', 'Dia']}
								type="monthly"
							/>
						</SimpleGrid>
					</>
				) : (
					<Stack>
						<Divider />
						<Text>Sem dados para esse mês.</Text>
						<Group>
							{data.billsData.length > 0 && (
								<Button
									onClick={() =>
										setMonthPickerStateImport(!monthPickerStateImport)
									}
								>
									Importar
								</Button>
							)}
							<Button
								onClick={() => {
									dispatch(
										createBillData(new Date(data.user.activeMonth).toString())
									)
								}}
							>
								Criar
							</Button>
						</Group>
						{data.billsData.length > 0 && (
							<Modal
								size="sm"
								title="Escolha um mês para importar"
								opened={monthPickerStateImport}
								onClose={() =>
									setMonthPickerStateImport(!monthPickerStateImport)
								}
							>
								<Box w="fit-content" m="0 auto">
									<MonthPicker
										placeholder="01/01/2023"
										defaultValue={startOfMonth(new Date())}
										getMonthControlProps={(date) => {
											const obj = { disabled: false }

											// Se não houver dados para certo mês
											const someBillData = data.billsData.some(
												(billData) =>
													date.getMonth() ===
														new Date(billData.initialDate).getMonth() &&
													date.getFullYear() ===
														new Date(billData.initialDate).getFullYear() &&
													billData.items &&
													billData.items.length > 0
											)
											if (!someBillData) {
												obj.disabled = true
											}

											return obj
										}}
										onChange={() => {
											setMonthPickerStateImport(false)
										}}
									/>
								</Box>
							</Modal>
						)}
					</Stack>
				)}
			</Layout>
		</>
	)
}
