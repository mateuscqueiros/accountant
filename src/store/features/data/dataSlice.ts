import { RootState } from '@/store/store';
import { compareStartOfMonth } from '@/utils/compareStartOfMonth';
import { notifications } from '@mantine/notifications';
import { PayloadAction, createSelector, createSlice, current } from '@reduxjs/toolkit';
import { getMonth, getYear, setMonth, setYear, startOfMonth } from 'date-fns';
import userData, { BillsDataItemType } from 'src/data';
import { v4 as uuidv4 } from 'uuid';

const initialState = userData;

export type TransferDataType = {
	from: string;
	to: string;
	installments: boolean;
	fixed: boolean;
	monthly: boolean;
	transform: number;
	action: 'replace' | 'add';
};

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		createItem: (state, action: PayloadAction<BillsDataItemType>) => {
			state.items = [...state.items, action.payload];

			notifications.show({
				title: `${action.payload.label}`,
				message: 'O item foi criado',
			});
		},
		updateItem: (state, action: PayloadAction<BillsDataItemType>) => {
			let itemToUpdate = state.items.filter((billItem) => billItem.id === action.payload.id)[0];

			itemToUpdate = {
				...action.payload,
			};

			state.items = [
				...state.items.filter((billItem) => billItem.id !== action.payload.id),
				itemToUpdate,
			];

			notifications.show({
				title: 'Ação',
				message: 'O item foi atualizado',
			});
		},
		deleteItem: (state, action: PayloadAction<string>) => {
			let otherItems = state.items.filter((billItem) => {
				return billItem.id !== action.payload;
			});

			state = {
				...state,
				items: {
					...otherItems,
				},
			};
		},
		setActiveMonth: (state, action: PayloadAction<string>) => {
			return {
				...state,
				user: {
					...state.user,
					activeMonth: startOfMonth(new Date(action.payload)).toString(),
				},
			};
		},
		transferData: (state, action: PayloadAction<TransferDataType>) => {
			const payload = action.payload;
			console.log(payload);

			const dataFromMonth = current(state).items.filter((item) => {
				/* Pegar itens com base no mês e tipos selecionados */
				const isFromMonth = compareStartOfMonth(item.date, payload.from);

				return (
					isFromMonth &&
					((item.type === 'installment' && payload.installments) ||
						(item.type === 'fixed' && payload.fixed) ||
						(item.type === 'monthly' && payload.monthly))
				);
			});

			let updatedItems: BillsDataItemType[] = [];

			if (dataFromMonth.length > 0) {
				updatedItems = dataFromMonth.map((item) => {
					/* Mudar a data para o novo mês */
					let newItem = {
						...item,
						date: setYear(
							setMonth(new Date(item.date), getMonth(new Date(payload.to))),
							getYear(new Date(payload.to))
						).toString(),
					};
					return newItem;
				});
			} else {
				notifications.show({
					title: 'Erro',
					message: 'Não existem itens no mês selecionado',
					color: 'red',
				});

				return state;
			}

			// Se houver itens de parcelas e houver um objeto transform, mudar as parcelas
			if (payload.installments && payload.transform !== 0) {
				updatedItems = updatedItems.map((item) => {
					let newItem = item;
					if (item.type === 'installment') {
						let newCurrent = item.installments.current + payload.transform;
						// Se for maior que o total, definir total
						// Se estiver entre 0 e total, continuar
						// Se for menor que 0, definir 0

						if (newCurrent > item.installments.total) {
							newItem = {
								...item,
								installments: {
									...item.installments,
									current: item.installments.total,
								},
							};
						} else if (newCurrent > 0 && newCurrent <= item.installments.total) {
							newItem = {
								...item,
								installments: {
									...item.installments,
									current: newCurrent,
								},
							};
						} else if (newCurrent < 0) {
							newItem = {
								...item,
								installments: {
									...item.installments,
									current: 0,
								},
							};
						}
					}
					return newItem;
				});
			}

			console.log(updatedItems);

			// Criar novos IDs
			updatedItems = updatedItems.map((item) => {
				return {
					...item,
					id: uuidv4(),
				};
			});

			// Inserir de acordo com o método escolhido
			if (payload.action === 'add') {
				// Se a ação for Adicionar, os itens antigos irão permanecer e os novos serão adicionados
				return {
					...state,
					items: [...state.items, ...updatedItems],
				};
			} else if (payload.action === 'replace') {
				// Se a ação for Substituir, os itens antigos serão removidos e substituídos pelos novos
				let itemsToKeep = state.items.filter((item) => {
					return !compareStartOfMonth(item.date, payload.to);
				});
				return {
					...state,
					items: [...itemsToKeep, ...updatedItems],
				};
			}

			console.log(updatedItems);
		},
	},
});

export const { createItem, updateItem, deleteItem, setActiveMonth, transferData } =
	dataSlice.actions;

export const selectData = (state: RootState) => state.data;
export const selectDataUser = (state: RootState) => state.data.user;
export const selectDataItems = (state: RootState) => state.data.items;
export const selectActiveDataItems = createSelector([selectData], (data) => {
	return data.items.filter((billItem) => compareStartOfMonth(billItem.date, data.user.activeMonth));
});

export default dataSlice.reducer;
