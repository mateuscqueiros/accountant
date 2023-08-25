import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formSlice from "./features/form/formSlice";
import modalSlice from "./features/modal/modalSlice";
import dataSlice from "./features/data/dataSlice";

const reducer = combineReducers({
    form: formSlice,
    modal: modalSlice,
    data: dataSlice
})

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;