import { FormErrorType } from "@/utils/validateForm";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppSelector } from "../..";
import { selectCount } from "../counter/counterSlice";

export interface IFormFields {
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

export interface IForm {
    fields: IFormFields,
    errors: FormErrorType[]
}

const initialState: IForm = {
    errors: [],
    fields: {
        label: '',
        value: 0,
        date: new Date().toString(),
        type: 'monthly',
        tags: ["Outros"],
        installments: {
            current: 1,
            total: 2,
            dueDay: 1
        },
        fixed: {
            dueDay: 1
        }
    }
}

export const formSlice = createSlice({
    name: 'form',
    initialState: initialState,
    reducers: {
        resetValues: state => {
            return {
                errors: [],
                fields: {
                    label: '',
                    value: 0,
                    date: new Date().toString(),
                    type: 'monthly',
                    tags: ["Outros"],
                    installments: {
                        current: 1,
                        total: 2,
                        dueDay: 1
                    },
                    fixed: {
                        dueDay: 1
                    }
                }
            }
        },
        resetErrors: (state) => {
            return {
                ...state,
                errors: []
            }
        },
        setFieldValue: (state, action: PayloadAction<{ field: string, newValue: any }>) => {
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.payload.field]: action.payload.newValue
                }
            }
        },
        setInstallmentsValues: (state, action: PayloadAction<{ field: string, newValue: any }>) => {
            return {
                ...state,
                fields: {
                    ...state.fields,
                    installments: {
                        ...state.fields.installments,
                        [action.payload.field]: action.payload.newValue
                    }
                },
            }
        },
        setFixedValues: (state, action: PayloadAction<{ field: string, newValue: any }>) => {
            return {
                ...state,
                fields: {
                    ...state.fields,
                    fixed: {
                        ...state.fields.fixed,
                        [action.payload.field]: action.payload.newValue
                    }
                },
            }
        },
        setValues: (state, action: PayloadAction<IFormFields>) => {
            return {
                ...state,
                fields: action.payload
            }
        },
        createNewItem: (state) => {
        },
        validateValues: (state) => {
            const { fields } = state;
            const errors = [];
            if (fields.label.length < 2) {
                errors.push({
                    message: "O nome deve ter mais de dois caracteres",
                    field: "label"
                })
            }
            // Value
            if (!fields.value) {
                errors.push({
                    message: "Por favor insira um valor",
                    field: "value"
                })
            }
            if (typeof fields.value === "number" && !(fields.value > 0)) {
                errors.push({
                    message: "O valor deve ser maior que 0",
                    field: "value"
                })
            }
            // Date

            // Verifica se o tipo é uma parcela
            if (fields.type == "installment") {
                // Installments current
                if (fields.installments.current >= fields.installments.total) {
                    errors.push({
                        message: "O valor é maior ou igual ao total",
                        field: "installments.current"
                    })
                }
                if (typeof fields.installments.current === "string") {
                    errors.push({
                        message: "Por favor insira um valor",
                        field: "installments.current"
                    })
                }
                if (typeof fields.installments.current === "number" && fields.installments.current < 1) {
                    errors.push({
                        message: "O valor mínimo é 1",
                        field: "installments.current"
                    })
                }

                // Installments total
                if (typeof fields.installments.total === "string") {
                    errors.push({
                        message: "Por favor insira um valor",
                        field: "installments.total"
                    })
                }
                if (!fields.installments.total) {
                    errors.push({
                        message: "Por favor insira um valor",
                        field: "installments.total"
                    })
                }
                if (fields.installments.total && fields.installments.total < 2) {
                    errors.push({
                        message: "O valor mínimo é 2",
                        field: "installments.total"
                    })
                }

                // Installments dueDay
                if (typeof fields.installments.dueDay === "number" && (fields.installments.dueDay < 1 || fields.installments.dueDay > 31)) {
                    errors.push({
                        message: "O valor deve estar entre 1 e 31",
                        field: "installments.dueDay"
                    })
                }
            }
            // Verifica se o tipo é fixo
            if (fields.type == "fixed") {
                if (!fields.fixed.dueDay) {
                    errors.push({
                        message: "Por favor insira um valor",
                        field: "fixed.dueDay"
                    })
                }
                if (fields.fixed.dueDay && (fields.fixed.dueDay < 1 || fields.fixed.dueDay > 31)) {
                    errors.push({
                        message: "O valor deve estar entre 1 e 31",
                        field: "fixed.dueDay"
                    })
                }
            }
            console.table(errors);
            state.errors = errors;
        },
        transformValues: (state) => {
            // Sanitiza os valores antes de salvá-los
            const { fields } = state;
            if (fields.type === "installment" || fields.type === "monthly") {
                fields.fixed.dueDay = "";
            }
            if (fields.type === "fixed" || fields.type === "monthly") {
                fields.installments.current = "";
                fields.installments.total = "";
                fields.installments.dueDay = "";
            }
            if (fields.tags.length === 0) {
                fields.tags.push("Outros");
            }

        }
    }
});

export const { resetValues, setFieldValue, setValues, createNewItem, setInstallmentsValues, setFixedValues, transformValues, validateValues, resetErrors } = formSlice.actions;

// "Método" para executar uma ação que não envolve alterar o state sem precisar importar o type toda vez
export const selectForm = (state: RootState) => state.form;

export default formSlice.reducer