import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils';
import dataSlice from './features/data/dataSlice';
import itemFormSlice from './features/itemForm/itemFormSlice';
import itemFormModalSlice from './features/modalItemForm/itemFormModalSlice';
import transferDataModalSlice from './features/transferDataModal/transferDataModalSlice';

const reducer = combineReducers({
	itemForm: itemFormSlice,
	itemFormModal: itemFormModalSlice,
	data: dataSlice,
	transferDataModal: transferDataModalSlice,
});

const data =
	typeof window !== 'undefined' && localStorage.getItem('accountant-data')
		? loadFromLocalStorage()
		: [];

export const store = configureStore({
	reducer,
	// preloadedState: data,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
