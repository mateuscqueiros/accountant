import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';

export type FormErrorType = {
	message: string;
	field: string;
};

export type ItemFormType = {
	label: string;
	value: number | '';
	date: string;
	type: string;
	tag: string;
	active: boolean;
	note: string;
	installments: {
		current: number | '';
		total: number | '';
		dueDay: number | '';
	};
	fixed: {
		dueDay: number | '';
	};
};

export interface IForm {
	values: ItemFormType;
}

export const initialValues: ItemFormType = {
	label: '',
	value: 0,
	date: new Date().toString(),
	type: 'monthly',
	tag: 'Outros',
	active: true,
	note: '',
	installments: {
		current: 1,
		total: 2,
		dueDay: 1,
	},
	fixed: {
		dueDay: 1,
	},
};

const initialState: IForm = {
	values: initialValues,
};

export const itemFormSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		resetValues: () => {
			return {
				values: {
					...initialValues,
					installments: {
						...initialValues.installments,
					},
					fixed: {
						...initialValues.fixed,
					},
				},
			};
		},
		setFieldValue: (state, action: PayloadAction<{ field: string; newValue: any }>) => {
			state.values = {
				...state.values,
				[action.payload.field]: action.payload.newValue,
			};
		},
		setValues: (state, action: PayloadAction<ItemFormType>) => {
			return {
				...state,
				values: {
					...action.payload,
					installments: {
						...action.payload.installments,
					},
					fixed: {
						...action.payload.fixed,
					},
				},
			};
		},
	},
});

export const { resetValues, setFieldValue, setValues } = itemFormSlice.actions;

// "Método" para executar uma ação que não envolve alterar o state sem precisar importar o type toda vez
export const selectForm = (state: RootState) => state.itemForm;

export default itemFormSlice.reducer;
