import { getMonth } from "date-fns";
import { RootState } from "../store";
import { BillsDataType } from "src/data";

export function selectActiveBillsItem(state: RootState): BillsDataType | undefined {
    let billsItem = state.data.userData.billsData.filter(bill => {
        return getMonth(new Date(bill.initialDate)) === getMonth(new Date(state.data.activeMonth));
    })[0];

    return billsItem
}