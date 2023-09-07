import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { startOfMonth, subMonths } from 'date-fns';
import { RootState } from '../..';

export type TransferDataFormValues = {
	date: string;
	fixed: boolean;
	installments: boolean;
	transform: number;
	monthly: boolean;
	action: string;
};

export type TransferDataModalValues = {
	opened: boolean;
	from: string | undefined;
	to: string | undefined;
};

export const initialValues: TransferDataFormValues = {
	date: startOfMonth(new Date(subMonths(new Date(), 1).toString())).toString(),
	fixed: true,
	installments: true,
	transform: 0,
	monthly: false,
	action: 'add',
};
const initialState: TransferDataModalValues = {
	opened: false,
	from: new Date().toString(),
	to: undefined,
};

export const transferDataModalSlice = createSlice({
	name: 'transferDataModal',
	initialState,
	reducers: {
		resetTransformDataModal: (stateData) => {
			stateData = {
				...initialState,
			};
		},
		openTransferDataModal: (state) => {
			return {
				...state,
				opened: true,
			};
		},
		closeTransferDataModal: (state) => {
			return {
				...state,
				opened: false,
			};
		},
		setTransferDataModalValues: (state, action: PayloadAction<{ from: string; to: string }>) => {
			return {
				...state,
				from: action.payload.from,
				to: action.payload.to,
			};
		},
	},
});

export const {
	resetTransformDataModal,
	openTransferDataModal,
	closeTransferDataModal,
	setTransferDataModalValues,
} = transferDataModalSlice.actions;

export const selectTransferDataModal = (state: RootState) => state.transferDataModal;

export default transferDataModalSlice.reducer;
