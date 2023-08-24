import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";

export interface IForm {
    label: string,
    value: number | "",
    date: string | "",
    type: string | "",
    tags: string[],
    installments: {
        current: number | "",
        total: number | "",
        dueDay: number | ""
    },
    fixed: {
        dueDay: number | ""
    }
}

const initialState: IForm = {
    label: '',
    value: 0,
    date: new Date().toString(),
    type: 'installment',
    tags: ["Outro"],
    installments: {
        current: 1,
        total: 2,
        dueDay: 1
    },
    fixed: {
        dueDay: 1
    }
}

export const formSlice = createSlice({
    name: 'form',
    initialState: initialState,
    reducers: {
        resetValues: state => {
            state = initialState
        },
        setFieldValue: (state, action: PayloadAction<{ field: string, newValue: any }>) => {
            return { ...state, [action.payload.field]: action.payload.newValue }
        },
        setValues: (state, action: PayloadAction<IForm>) => {
            state = action.payload
        },
        createNewItem: (state) => {
            console.log("Criando novo item com os valores");
        },
    }
});

export const { resetValues, setFieldValue, setValues, createNewItem } = formSlice.actions;

// "Método" para executar uma ação que não envolve alterar o state sem precisar importar o type toda vez
export const selectForm = (state: RootState) => state.form;

export default formSlice.reducer