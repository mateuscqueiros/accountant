import { defaultData as dataInitialValues } from '@/consts/data';
import { getNextCategoryId } from '@/lib/categories';
import { compareStartOfMonth } from '@/lib/dates';
import { NotificationError, NotificationSuccess } from '@/lib/notifications';
import { Category, DataContextType, Transaction, TransferData, UserData } from '@/types/data';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { getMonth, getYear, setMonth, setYear, startOfMonth } from 'date-fns';
import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

export const DataContext = createContext<DataContextType>({} as DataContextType);

export function DataProvider({ children }: PropsWithChildren) {
	const setActiveMonth = (date: string) => {
		setData((prev) => {
			return {
				...prev,
				activeMonth: startOfMonth(new Date(date)),
			};
		});
	};

	const transferData = (transferData: TransferData) => {
		setData((prev) => {
			const payload = transferData;
			const state = data;
			const dataFromMonth =
				state &&
				state.items.filter((item) => {
					/* Pegar itens com base no mês e tipos selecionados */
					const isFromMonth = compareStartOfMonth(item.date, new Date(payload.from));

					return (
						isFromMonth &&
						((item.type === 'installment' && payload.installments) ||
							(item.type === 'fixed' && payload.fixed) ||
							(item.type === 'monthly' && payload.monthly))
					);
				});

			let updatedItems: Transaction[] = [];

			/* Mudar a data para o novo mês */
			if (dataFromMonth && dataFromMonth.length > 0) {
				updatedItems = dataFromMonth.map((item) => {
					let newItem = {
						...item,
						date: setYear(
							setMonth(new Date(item.date), getMonth(new Date(payload.to))),
							getYear(new Date(payload.to))
						),
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
					return !compareStartOfMonth(item.date, new Date(payload.to));
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
		if (data === undefined) {
			return [];
		}

		let activeMonthItems = data.items.filter((billItem) => {
			return compareStartOfMonth(billItem.date, data.activeMonth);
		});

		return activeMonthItems;
	};

	const log = (pre?: string) => {
		if (pre) {
			console.log(pre, data);
		} else {
			console.log(data);
		}
	};

	/* Items */
	const createItem = (item: Transaction) => {
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

	const updateItem = (item: Transaction) => {
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

	/* Categories */
	const addCategory = (props: { label: string; slug: string; color: string }) => {
		const { label, slug, color } = props;
		const categories = data.user.categories;
		const nextId = getNextCategoryId(categories);
		setData((prev) => {
			return {
				...prev,
				user: {
					...prev.user,
					categories: [
						...prev.user.categories,
						{
							id: nextId,
							slug,
							label,
							color,
						},
					],
				},
			};
		});
		log();
	};

	const editCategory = (category: Category) => {
		let otherCategories = data.user.categories.filter((categoryItem) => {
			return categoryItem.id !== category.id;
		});

		setData((prev) => {
			return {
				...prev,
				user: {
					...prev.user,
					categories: [...otherCategories, category],
				},
			};
		});

		return NotificationSuccess({
			message: `A categoria ${category.label} foi editada.`,
		});
	};

	const deleteCategory = (id: number) => {
		let categoryToDelete = data.user.categories.filter((category) => {
			return category.id === id;
		})[0];

		let defaultCategory = data.user.categories.filter((category) => {
			return category.default;
		})[0];

		if (!categoryToDelete.default) {
			let otherCategories = data.user.categories.filter((categoryItem) => {
				return categoryItem.id !== id;
			});

			// Remove category from items and set to default category
			let items = data.items.map((item) => {
				if (item.categoryId === id) {
					item.categoryId = defaultCategory.id;
				}
				return item;
			});

			setData((prev) => {
				return {
					...prev,
					items,
					user: {
						...prev.user,
						categories: [...otherCategories],
					},
				};
			});

			return NotificationSuccess({
				message: `A categoria ${categoryToDelete.label} foi deletada. Seus itens agora pertencem à categoria ${defaultCategory.label}.`,
			});
		}

		return NotificationError({
			message: `A categoria ${categoryToDelete.label} é uma categoria padrão. Não é possível deletar categorias padrão`,
		});
	};

	const [storageData, setStorageData] = useLocalStorage<UserData>({
		key: 'accountant-data',
		defaultValue: dataInitialValues,
	}) as unknown as [UserData, Dispatch<SetStateAction<UserData>>];

	const [data, setData] = useState<UserData>(dataInitialValues) as unknown as [
		UserData,
		Dispatch<SetStateAction<UserData>>,
	];

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			setStorageData(data);
		}
	}, [data]);

	return (
		<DataContext.Provider
			value={{
				values: {
					...data,
				},
				item: {
					create: createItem,
					update: updateItem,
					delete: deleteItem,
				},

				category: {
					add: addCategory,
					edit: editCategory,
					delete: deleteCategory,
				},

				setActiveMonth,
				transferData,
				selectActiveData,

				log,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}
