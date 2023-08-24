import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";

export interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        decrementByAmount: (state, action: PayloadAction<number>) => {
            state.value -= action.payload
        }
    }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// "Método" para selecionar valor do state sem precisar importar o type toda vez
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer