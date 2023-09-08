import { ReactNode, createContext, useState } from 'react';
import { itemFormInitialValues } from './itemForm.consts';
import { ItemFormContextType, ItemFormType } from './itemForm.types';

export const ItemFormContext = createContext<ItemFormContextType | null>(null);

export default function ItemFormContextProvider({ children }: { children: ReactNode }) {
	/* Item Form */
	const resetItemFormValues = () => {
		setData((prev) => {
			return {
				...prev,
				values: {
					...itemFormInitialValues,
					installments: {
						...itemFormInitialValues.installments,
					},
					fixed: {
						...itemFormInitialValues.fixed,
					},
				},
			};
		});
	};

	const setItemFormValue = ({ field, newValue }: { field: string; newValue: any }) => {
		setData((prev) => {
			return {
				...prev,
				values: {
					...prev.values,
					[field]: newValue,
				},
			};
		});
	};

	const setItemFormValues = (fields: ItemFormType) => {
		setData((prev) => {
			return {
				...prev,
				values: {
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

	const [data, setData] = useState<ItemFormContextType>({
		values: itemFormInitialValues,

		resetItemFormValues,
		setItemFormValue,
		setItemFormValues,
	});

	return <ItemFormContext.Provider value={data}>{children}</ItemFormContext.Provider>;
}
