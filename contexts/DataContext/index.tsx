'use client';

import { getNextCategoryId } from '@/utils/categories';
import { compareStartOfMonth } from '@/utils/compareStartOfMonth';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { getMonth, getYear, setMonth, setYear, startOfMonth } from 'date-fns';
import { ReactNode, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dataInitialValues } from '../../shared/consts/data.consts';
import {
	BillsDataItemType,
	DataContextType,
	TransferDataType,
	UserDataType,
} from '../../shared/types/data.types';

export const DataContext = createContext<DataContextType>({} as DataContextType);

export default function DataContextProvider({ children }: { children: ReactNode }) {
	const createItem = (item: BillsDataItemType) => {
		setData((prev) => {
			return {
				...prev,
				items: [...prev.items, item],
			};
		});

		notifications.show({
			title: `${item.label}`,
			message: 'O item foi criado',
		});
	};

	const updateItem = (item: BillsDataItemType) => {
		setData((prev) => {
			let itemToUpdate = prev.items.filter((billItem) => billItem.id === item.id)[0];

			itemToUpdate = {
				...item,
			};

			return {
				...prev,
				items: [...prev.items.filter((billItem) => billItem.id !== item.id), itemToUpdate],
			};
		});
	};

	const deleteItem = (id: string) => {
		setData((prev) => {
			let otherItems = prev.items.filter((billItem) => {
				return billItem.id !== id;
			});

			return {
				...prev,
				items: [...otherItems],
			};
		});
	};

	const setActiveMonth = (date: string) => {
		setData((prev) => {
			return {
				...prev,
				user: {
					...prev.user,
					activeMonth: startOfMonth(new Date(date)).toString(),
				},
			};
		});
	};

	const transferData = (transferData: TransferDataType) => {
		setData((prev) => {
			const payload = transferData;
			const state = data;
			const dataFromMonth =
				state &&
				state.items.filter((item) => {
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

			/* Mudar a data para o novo mês */
			if (dataFromMonth && dataFromMonth.length > 0) {
				updatedItems = dataFromMonth.map((item) => {
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

				return prev;
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

			return prev;
		});
	};

	const selectActiveData = () => {
		return data !== undefined
			? data.items.filter((billItem) => compareStartOfMonth(billItem.date, data.user.activeMonth))
			: dataInitialValues.items.filter((billItem) =>
					compareStartOfMonth(billItem.date, dataInitialValues.user.activeMonth)
			  );
	};

	const addCategory = ({ label, color }: { label: string; color: string }) => {
		setData((prev) => {
			return {
				...prev,
				user: {
					...prev.user,
					categories: [
						...prev.user.categories,
						{
							id: getNextCategoryId(
								data !== undefined ? data.user.categories : dataInitialValues.user.categories
							),
							label,
							color,
						},
					],
				},
			};
		});
	};

	const log = (pre?: string) => {
		if (pre) {
			console.log(pre, data);
		} else {
			console.log(data);
		}
	};

	const [data, setData] = useLocalStorage<UserDataType>({
		key: 'accountant-data',
		defaultValue: dataInitialValues,
	});

	return (
		<DataContext.Provider
			value={{
				...data,

				createItem,
				updateItem,
				deleteItem,
				setActiveMonth,
				transferData,
				selectActiveData,
				addCategory,
				log,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}
