import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { format, getMonth, startOfMonth } from 'date-fns'
import { RootState } from '@/store/store'
import userData, { BillsDataItemType } from 'src/data'
import { notifications } from '@mantine/notifications'
import {
	getIndexFromItemBillByDate,
	getIndexFromItemBillById
} from '@/utils/getIndexFromItemBill'
import { v4 as uuidv4 } from 'uuid'

const initialState = userData

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		createItem: (state, action: PayloadAction<BillsDataItemType>) => {
			let itemBillIndex = state.billsData.findIndex((bill) => {
				return (
					getMonth(new Date(bill.initialDate)) ===
					getMonth(new Date(action.payload.date))
				)
			})

			if (itemBillIndex !== undefined) {
				state.billsData[itemBillIndex].items = [
					...state.billsData[itemBillIndex].items,
					action.payload
				]

				notifications.show({
					title: `${action.payload.label}`,
					message: 'O item foi criado'
				})
			} else {
				state.billsData = [
					...state.billsData,
					{
						id: uuidv4(),
						initialDate: startOfMonth(new Date(action.payload.date)).toString(),
						items: [action.payload]
					}
				]

				notifications.show({
					title: `${action.payload.label}`,
					message: 'O item foi criado'
				})
			}
		},
		updateItem: (state, action: PayloadAction<BillsDataItemType>) => {
			/* Receber data do item */
			/* Procurar billData que que armazana este item pelo id */
			let billOfItemToUpdateIndex = getIndexFromItemBillById(
				state,
				action.payload.id
			)

			/* Verificar se a data do item é a mesma da data do billData (se a data foi alterada para outro mês temos que remover daqui e inserir no correto) */
			if (billOfItemToUpdateIndex !== undefined) {
				let billDataInitialDate =
					state.billsData[billOfItemToUpdateIndex].initialDate
				let itemDate = action.payload.date
				let initialDateEqualToNewItemDate =
					format(new Date(billDataInitialDate), 'MM/yyyy') ===
					format(new Date(itemDate), 'MM/yyyy')
				if (initialDateEqualToNewItemDate) {
					/* a data do item não mudou ou continua nesse mês, pode inserir aqui mesmo */
					if (billOfItemToUpdateIndex !== undefined) {
						state.billsData[billOfItemToUpdateIndex].items = [
							...state.billsData[billOfItemToUpdateIndex].items.filter(
								(item) => {
									return item.id !== action.payload.id
								}
							),
							action.payload
						]

						notifications.show({
							title: `${action.payload.label}`,
							message: 'O item foi atualizado'
						})
					}
				} else {
					/* o mês do item mudou, apague o item do bill antigo e verifique se existe um bill com a nova data para inserir este item */
					state.billsData[billOfItemToUpdateIndex].items = [
						...state.billsData[billOfItemToUpdateIndex].items.filter((item) => {
							return item.id !== action.payload.id
						})
					]
					let billToInsert = getIndexFromItemBillByDate(
						state,
						action.payload.date
					)
					if (billToInsert !== undefined) {
						/* existe, pode inserir aqui */
						state.billsData[billToInsert].items = [
							...state.billsData[billToInsert].items.filter((item) => {
								return item.id !== action.payload.id
							}),
							action.payload
						]

						notifications.show({
							title: `${action.payload.label}`,
							message: 'O item foi atualizado'
						})
					} else {
						/* não existe, crie ele e insira o item nele */
						state.billsData = [
							...state.billsData,
							{
								id: uuidv4(),
								initialDate: startOfMonth(
									new Date(action.payload.date)
								).toString(),
								items: [action.payload]
							}
						]
					}
				}
			}
		},
		deleteItem: (state, action: PayloadAction<string>) => {
			let billOfItemToUpdateIndex = getIndexFromItemBillById(
				state,
				action.payload
			)

			if (billOfItemToUpdateIndex !== undefined) {
				state.billsData[billOfItemToUpdateIndex].items = [
					...state.billsData[billOfItemToUpdateIndex].items.filter((item) => {
						return item.id !== action.payload
					})
				]
				notifications.show({
					title: 'Ação',
					message: 'O item foi deletado',
					color: 'red'
				})
			}
		},
		setActiveMonth: (state, action: PayloadAction<string>) => {
			return {
				...state,
				user: {
					...state.user,
					activeMonth: startOfMonth(new Date(action.payload)).toString()
				}
			}
		},
		createBillData: (state, action: PayloadAction<string>) => {
			let initialDateAlreadyExists = state.billsData.filter((item) => {
				return (
					startOfMonth(new Date(item.initialDate)) ===
					startOfMonth(new Date(action.payload))
				)
			})[0]

			if (!initialDateAlreadyExists) {
				state = {
					...state,
					billsData: [
						...state.billsData,
						{
							id: uuidv4(),
							initialDate: startOfMonth(new Date(action.payload)).toString(),
							items: []
						}
					]
				}
				notifications.show({
					title: 'Ação',
					message: 'Novo mês foi criado'
				})
			}
		},
		transferData: (state, action: PayloadAction) => {
			console.log('Transferindo dados')
		}
	}
})

export const {
	createItem,
	updateItem,
	deleteItem,
	setActiveMonth,
	createBillData
} = dataSlice.actions

export const selectData = (state: RootState) => state.data
export const selectDataItems = (state: RootState) =>
	state.data.billsData[0].items
export const selectActiveBillsItem = (state: RootState) =>
	state.data.billsData.filter((bill) => {
		return (
			startOfMonth(new Date(bill.initialDate)).toString() ===
			startOfMonth(new Date(state.data.user.activeMonth)).toString()
		)
	})[0]

export default dataSlice.reducer
