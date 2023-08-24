import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import formSlice from "./features/form/formSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        form: formSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;