import { itemModalInitialValues, transferDataModalInitialValues } from '@/consts/modals';
import { BillsDataItem } from '@/types/data/data.types';
import { ItemForm } from '@/types/forms/forms.types';
import { ModalsContextType } from '@/types/modals/modals.types';
import { PropsWithChildren, createContext, useState } from 'react';

export const ModalsContext = createContext<ModalsContextType>({} as ModalsContextType);

export function ModalsProvider({ children }: PropsWithChildren) {
	/* Item Form Modal */
	const openItem = () => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						opened: true,
					},
				},
			};
		});
	};

	const openUpdateItem = (billDataItem: BillsDataItem) => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						opened: true,
						command: {
							...billDataItem,
							categoryId: String(billDataItem.categoryId),
						},
						updateItem: billDataItem.id,
						action: 'update',
					},
				},
			};
		});
	};

	const closeItem = () => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						opened: false,
					},
				},
			};
		});
	};

	const toggleItem = () => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						opened: !prev.item.values.opened,
					},
				},
			};
		});
	};

	const commandFormItem = (fields: ItemForm) => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						command: {
							...fields,
						},
					},
				},
			};
		});
	};

	const setActionItem = (action: string) => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						action,
					},
				},
			};
		});
	};

	const setUpdateItem = (action: string) => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						updateItem: action,
					},
				},
			};
		});
	};

	const setFieldItem = <T extends keyof ItemForm, R extends ItemForm[T]>(field: T, value: R) => {
		setData((prev) => {
			prev.item.values.command[field] = value;
			return prev;
		});
	};

	const resetItem = () => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						opened: false,
						command: {
							...itemModalInitialValues.command,
						},
						updateItem: '',
						action: 'create',
					},
				},
			};
		});
	};

	/* Transfer */

	const resetTransfer = () => {
		setData((prev) => {
			return {
				...prev,
				transferData: {
					...prev.transferData,
					values: {
						...transferDataModalInitialValues,
					},
				},
			};
		});
	};

	const openTransfer = () => {
		setData((prev) => {
			return {
				...prev,
				transferData: {
					...prev.transferData,
					values: {
						...prev.transferData.values,
						opened: true,
					},
				},
			};
		});
	};

	const closeTransfer = () => {
		setData((prev) => {
			return {
				...prev,
				transferData: {
					...prev.transferData,
					values: {
						...prev.transferData.values,
						opened: false,
					},
				},
			};
		});
	};

	const setValuesTransfer = (transferValues: { from: string; to: string }) => {
		const { from, to } = transferValues;
		setData((prev) => {
			return {
				...prev,
				transferData: {
					...prev.transferData,
					values: {
						...prev.transferData.values,
						from,
						to,
					},
				},
			};
		});
	};

	const [data, setData] = useState<ModalsContextType>({
		item: {
			values: itemModalInitialValues,
			open: openItem,
			close: closeItem,
			toggle: toggleItem,
			commandForm: commandFormItem,
			setAction: setActionItem,
			setUpdateItem,
			setField: setFieldItem,
			openUpdate: openUpdateItem,
			reset: resetItem,
		},
		transferData: {
			values: transferDataModalInitialValues,
			reset: resetTransfer,
			open: openTransfer,
			close: closeTransfer,
			setValues: setValuesTransfer,
		},
	});

	return <ModalsContext.Provider value={data}>{children}</ModalsContext.Provider>;
}
