import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BillsDataItemType } from 'src/data';
import { RootState } from '../..';
import { ItemFormType, initialValues } from '../itemForm/itemFormSlice';

const initialState = {
	opened: false,
	command: {
		...initialValues,
		installments: {
			...initialValues.installments,
		},
		fixed: {
			...initialValues.fixed,
		},
	},
	updateItem: '',
	action: 'update',
};

export const itemFormModalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state) => {
			state.opened = true;
		},
		closeModal: (state) => {
			state.opened = false;
		},
		toggleModal: (state) => {
			state.opened = !state.opened;
		},
		command: (state, action: PayloadAction<ItemFormType>) => {
			state.command = {
				...action.payload,
				installments: {
					...action.payload.installments,
				},
				fixed: {
					...action.payload.fixed,
				},
			};
		},
		setAction: (state, action: PayloadAction<string>) => {
			state.action = action.payload;
		},
		setUpdateItem: (state, action: PayloadAction<string>) => {
			state.updateItem = action.payload;
		},
		setType: (state, action: PayloadAction<string>) => {
			state.command = {
				...initialValues,
				installments: {
					...initialValues.installments,
				},
				fixed: {
					...initialValues.fixed,
				},
				type: action.payload,
			};
		},
		openUpdateModal: (state, action: PayloadAction<BillsDataItemType>) => {
			return {
				opened: true,
				command: {
					...action.payload,
					installments: {
						...action.payload.installments,
					},
					fixed: {
						...action.payload.fixed,
					},
				},
				updateItem: action.payload.id,
				action: 'update',
			};
		},
		resetModal: () => {
			return {
				opened: false,
				command: {
					...initialValues,
					installments: {
						...initialValues.installments,
					},
					fixed: {
						...initialValues.fixed,
					},
				},
				updateItem: '',
				action: 'create',
			};
		},
	},
});

export const {
	openModal,
	closeModal,
	toggleModal,
	command,
	setAction,
	setUpdateItem,
	resetModal,
	openUpdateModal,
	setType,
} = itemFormModalSlice.actions;

export const selectItemFormModal = (state: RootState) => state.itemFormModal;

export default itemFormModalSlice.reducer;
