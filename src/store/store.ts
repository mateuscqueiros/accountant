import { combineReducers, configureStore } from '@reduxjs/toolkit';
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

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
