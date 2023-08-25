import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BillsDataItemType } from "data";
import { RootState } from "store/store";
import { initialValues } from "../form/formSlice";

const initialState = {
    opened: false,
    command: {
        ...initialValues
    },
    updateItem: "",
    action: "update",
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.opened = true
        },
        closeModal: (state) => {
            state.opened = false
        },
        toggleModal: (state) => {
            state.opened = !state.opened
        },
        command: (state, action: PayloadAction<BillsDataItemType>) => {
            state.command = {
                ...action.payload,
                installments: {
                    ...action.payload.installments
                },
                fixed: {
                    ...action.payload.fixed
                }
            }
        },
        setAction: (state, action: PayloadAction<string>) => {
            state.action = action.payload
        },
        setUpdateItem: (state, action: PayloadAction<string>) => {
            state.updateItem = action.payload
        },
        openUpdateModal: (state, action: PayloadAction<BillsDataItemType>) => {
            return {
                opened: true,
                command: {
                    ...action.payload,
                    installments: {
                        ...action.payload.installments
                    },
                    fixed: {
                        ...action.payload.fixed
                    }
                },
                updateItem: action.payload.id,
                action: "update",
            }
        },
        resetModal: () => {
            return {
                opened: false,
                command: {
                    ...initialValues,
                    installments: {
                        ...initialValues.installments
                    },
                    fixed: {
                        ...initialValues.fixed
                    }
                },
                updateItem: "",
                action: "create",
            }
        }
    }
});

export const { openModal, closeModal, toggleModal, command, setAction, setUpdateItem, resetModal, openUpdateModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer