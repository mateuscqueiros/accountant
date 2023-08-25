import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";

export type FormErrorType = {
    message: string,
    field: string
}

export type FormFields = {
    label: string,
    value: number | "",
    date: string,
    type: string,
    tags: string[],
    active: boolean,
    note: string,
    installments: {
        current: number | "",
        total: number | "",
        dueDay: number | ""
    },
    fixed: {
        dueDay: number | ""
    }
}

export interface IForm {
    values: FormFields,
}

export const initialValues: FormFields = {
    label: '',
    value: 0,
    date: new Date().toString(),
    type: 'monthly',
    tags: ["Outros"],
    active: true,
    note: "",
    installments: {
        current: 1,
        total: 2,
        dueDay: 1
    },
    fixed: {
        dueDay: 1
    }
}

const initialState: IForm = {
    values: initialValues
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        resetValues: () => {
            return {
                ...initialState
            }
        },
        setFieldValue: (state, action: PayloadAction<{ field: string, newValue: any }>) => {
            state.values = {
                ...state.values,
                [action.payload.field]: action.payload.newValue
            }
        },
        setValues: (state, action: PayloadAction<FormFields>) => {
            return {
                ...state,
                values: action.payload
            }
        }
    }
});

export const { resetValues, setFieldValue, setValues } = formSlice.actions;

// "Método" para executar uma ação que não envolve alterar o state sem precisar importar o type toda vez
export const selectForm = (state: RootState) => state.form;

export default formSlice.reducer