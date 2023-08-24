import DefaultTable from "..";
import { useState } from "react";
import { BillsDataItemType } from "data";
import { ItemFixedTable } from "./ItemFixedTable";
import { selectForm, setType } from "@/store/features/form/formSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function FixedTable({ header, data, action }: any) {
    const [fixedData, setFixedData] = useState<BillsDataItemType[]>(data.filter((item: any) => (item.type === "fixed")));
    const [total, setTotal] = useState<number>(fixedData.reduce((partialSum, a) => partialSum + a.value, 0));

    const formState = useAppSelector(selectForm);
    const dispatch = useAppDispatch();

    const rows = fixedData.map((item: BillsDataItemType) => (
        <ItemFixedTable key={item.id} item={item} />
    ));

    return (
        <DefaultTable title="Fixos" action={action} onAddAction={() => {
            dispatch(setType("fixed"));
            action.open()
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