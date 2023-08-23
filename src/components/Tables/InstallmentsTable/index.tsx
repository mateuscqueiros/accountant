import DefaultTable from "..";
import { FormValues } from "@/contexts/CreateFormContext";
import { useState } from "react";
import { BillsDataItemType } from "data";
import { ItemInstallmentTable } from "./ItemInstallmentTable";

export default function InstallmentsTable({ header, data, action, setForm }: any) {
    const [installmentsData, setInstallmentsData] = useState<BillsDataItemType[]>(data.filter((item: any) => (item.type === "installment")));
    const [total, setTotal] = useState<number>(installmentsData.reduce((partialSum, a) => partialSum + a.value, 0));

    const rows = installmentsData.map((item: BillsDataItemType) => (
        <ItemInstallmentTable key={item.id} item={item} />
    ));

    return (
        <DefaultTable title="Parcelados" action={action} onAddAction={() => {
            setForm(((prevValues: FormValues) => {
                return {
                    ...prevValues,
                    type: "installment"
                }
            }))
            action.open()
        }}>
            <thead>
                <tr>
                    {header.map((headerItem: string) => {
                        return <th key={headerItem}>{headerItem}</th>
                    })}
                </tr>
            </thead>
            <tbody>{rows}</tbody>
            <tfoot>
                <tr>
                    <th>Total</th>
                    <th>{total}</th>
                    <th></th>
                    <th></th>
                </tr>
            </tfoot>
        </DefaultTable >
    )
}