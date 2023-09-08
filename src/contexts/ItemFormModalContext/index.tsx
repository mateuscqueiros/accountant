import { ReactNode, createContext, useState } from 'react';
import { BillsDataItemType } from '../DataContext/dataContext.types';
import { ItemFormType } from '../ItemFormContext/itemForm.types';
import { itemFormModalInitialValues } from './itemFormModal.consts';
import { ItemFormModalContextType } from './itemFormModal.types';

export const ItemFormModalContext = createContext<ItemFormModalContextType | null>(null);

export default function ItemFormModalContextProvider({ children }: { children: ReactNode }) {
	/* Item Form Modal */
	const open = () => {
		setData((prev) => {
			return {
				...prev,
				opened: true,
			};
		});
	};

	const close = () => {
		setData((prev) => {
			return {
				...prev,
				opened: false,
			};
		});
	};

	const toggle = () => {
		setData((prev) => {
			return {
				...prev,
				opened: !prev.opened,
			};
		});
	};

	const commandForm = (fields: ItemFormType) => {
		setData((prev) => {
			return {
				...prev,
				command: {
					...fields,
					installments: {
						...fields.installments,
					},
					fixed: {
						...fields.fixed,
					},
				},
			};
		});
	};

	const setAction = (action: string) => {
		setData((prev) => {
			return {
				...prev,
				action,
			};
		});
	};

	const setUpdateItem = (action: string) => {
		setData((prev) => {
			return {
				...prev,
				updateItem: action,
			};
		});
	};

	const setType = (type: string) => {
		setData((prev) => {
			return {
				...prev,
				command: {
					...itemFormModalInitialValues.command,
					installments: {
						...itemFormModalInitialValues.command.installments,
					},
					fixed: {
						...itemFormModalInitialValues.command.fixed,
					},
					type,
				},
			};
		});
	};

	const openUpdate = (billDataItem: BillsDataItemType) => {
		setData((prev) => {
			return {
				...prev,
				opened: true,
				command: {
					...billDataItem,
					installments: {
						...billDataItem.installments,
					},
					fixed: {
						...billDataItem.fixed,
					},
				},
				updateItem: billDataItem.id,
				action: 'update',
			};
		});
	};

	const reset = () => {
		setData((prev) => {
			return {
				...prev,
				opened: false,
				command: {
					...itemFormModalInitialValues.command,
					installments: {
						...itemFormModalInitialValues.command.installments,
					},
					fixed: {
						...itemFormModalInitialValues.command.fixed,
					},
				},
				updateItem: '',
				action: 'create',
			};
		});
	};

	const [data, setData] = useState<ItemFormModalContextType>({
		...itemFormModalInitialValues,

		open,
		close,
		toggle,
		commandForm,
		setAction,
		setUpdateItem,
		setType,
		openUpdate,
		reset,
	});

	return <ItemFormModalContext.Provider value={data}>{children}</ItemFormModalContext.Provider>;
}
