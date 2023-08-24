import DefaultTable from "..";
import { useState } from "react";
import { BillsDataItemType } from "data";
import { ItemMonthlyTable } from "@/components/Tables/MonthlyTable/ItemMonthlyTable";
import { selectForm, setFieldValue } from "@/store/features/form/formSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function MonthlyTable({ header, data, action }: any) {
    const [monthlyData, setMonthlyData] = useState<BillsDataItemType[]>(data.filter((item: any) => (item.type === "monthly")));
    const [total, setTotal] = useState(monthlyData.reduce((partialSum, a) => partialSum + a.value, 0));

    const rows = monthlyData.map((item: BillsDataItemType) => (
        <ItemMonthlyTable key={item.id} item={item} />
    ));

    const formState = useAppSelector(selectForm);
    const dispatch = useAppDispatch();

    return (
        <DefaultTable title="Mensais" action={action} onAddAction={() => {
            dispatch(setFieldValue({ field: "type", newValue: "monthly" }));
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