import { format } from "date-fns";
import { UserDataType } from "src/data";

/* Seleciona o index do Bill(lista dos itens criados em certo mês) que tem o id do item procurado */
export function getIndexFromItemBillById(state: UserDataType, id: string): number | undefined {
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

/* Seleciona o index do Bill(lista dos itens criados em certo mês) que tem o date do item procurado */
export function getIndexFromItemBillByDate(state: UserDataType, date: string): number | undefined {
    let billOfItemToUpdateIndex = undefined;

    state.billsData.map((bill, index) => {
        if (format(new Date(bill.initialDate), "MM/yyyy") === format(new Date(date), "MM/yyyy")) {
            billOfItemToUpdateIndex = index
        }
    })

    return billOfItemToUpdateIndex
}