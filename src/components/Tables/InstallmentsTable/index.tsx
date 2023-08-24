import DefaultTable from "..";
import { useState } from "react";
import { BillsDataItemType } from "data";
import { ItemInstallmentTable } from "./ItemInstallmentTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectForm, setFieldValue, setType } from "@/store/features/form/formSlice";

export default function InstallmentsTable({ header, data, action, setForm }: any) {
    const [installmentsData, setInstallmentsData] = useState<BillsDataItemType[]>(data.filter((item: any) => (item.type === "installment")));
    const [total, setTotal] = useState<number>(installmentsData.reduce((partialSum, a) => partialSum + a.value, 0));

    const rows = installmentsData.map((item: BillsDataItemType) => (
        <ItemInstallmentTable key={item.id} item={item} />
    ));

    const formState = useAppSelector(selectForm);
    const dispatch = useAppDispatch();

    return (
        <DefaultTable title="Parcelados" action={action} onAddAction={() => {
            dispatch(setType("installment"));
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