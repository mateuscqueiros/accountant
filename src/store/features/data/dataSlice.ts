import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import userData, { BillsDataItemType, UserDataType } from "data";
import { getMonth } from "date-fns";
import { RootState } from "store/store";

const initialState: UserDataType = userData;

function getIndexFromItemBill(state: UserDataType, id: string): number | undefined {
    // Seleciona o index do Bill que tem o id do item procurado
    let billOfItemToUpdateIndex = undefined;
    state.billsData.map((bill, index) => {
        let itemToUpdate = bill.items.filter(item => {
            return item.id === id
        })[0];

        if (itemToUpdate) {
            billOfItemToUpdateIndex = index;
        }
    });

    return billOfItemToUpdateIndex
}

export const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        createItem: (state, action: PayloadAction<BillsDataItemType>) => {
            let itemBillIndex = state.billsData.findIndex((bill) => {
                return getMonth(new Date(bill.initialDate)) === getMonth(new Date(action.payload.date));
            });

            state.billsData[itemBillIndex].items = [
                ...state.billsData[itemBillIndex].items,
                action.payload
            ]
        },
        updateItem: (state, action: PayloadAction<BillsDataItemType>) => {

            let billOfItemToUpdateIndex = getIndexFromItemBill(state, action.payload.id);

            if (billOfItemToUpdateIndex !== undefined) {
                state.billsData[billOfItemToUpdateIndex].items = [
                    ...state.billsData[billOfItemToUpdateIndex].items.filter(item => {
                        return item.id !== action.payload.id
                    }),
                    action.payload
                ]
            }
        },
        deleteItem: (state, action: PayloadAction<string>) => {

            let billOfItemToUpdateIndex = getIndexFromItemBill(state, action.payload);

            if (billOfItemToUpdateIndex !== undefined) {
                state.billsData[billOfItemToUpdateIndex].items = [
                    ...state.billsData[billOfItemToUpdateIndex].items.filter(item => {
                        return item.id !== action.payload
                    })
                ]
            }

        }
    }
});

export const { createItem, updateItem, deleteItem } = dataSlice.actions;

export const selectData = (state: RootState) => state.data;
export const selectDataItems = (state: RootState) => state.data.billsData[0].items;
export const selectActiveBillsItem = (state: RootState) => state.data.billsData.filter(bill => {
    return getMonth(new Date(bill.initialDate)) === getMonth(new Date);
})[0];

export default dataSlice.reducer