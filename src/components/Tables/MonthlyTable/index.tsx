import { format } from "date-fns";
import DefaultTable from "..";
import { FormValues } from "@/contexts/CreateFormContext";
import { useState } from "react";
import { BillsDataItemType } from "data";
import { ItemMonthlyTable } from "@/components/Tables/MonthlyTable/ItemMonthlyTable";

export default function MonthlyTable({ header, data, action, setForm }: any) {
    const [monthlyData, setMonthlyData] = useState<BillsDataItemType[]>(data.filter((item: any) => (item.type === "monthly")));
    const [total, setTotal] = useState(monthlyData.reduce((partialSum, a) => partialSum + a.value, 0));

    const rows = monthlyData.map((item: BillsDataItemType) => (
        <ItemMonthlyTable key={item.id} item={item} />
    ));

    return (
        <DefaultTable title="Mensais" action={action} onAddAction={() => {
            setForm(((prevValues: FormValues) => {
                return {
                    ...prevValues,
                    type: "monthly"
                }
            }))
            action.open();
        }}>
            <thead>
                <tr>
                    {header.map((headerItem: any) => {
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
                </tr>
            </tfoot>
        </DefaultTable>
    )
}