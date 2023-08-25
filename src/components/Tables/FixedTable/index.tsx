import DefaultTable from "..";
import { useState } from "react";
import { BillsDataItemType } from "data";
import { ItemFixedTable } from "./ItemFixedTable";
import { initialValues, setFieldValue } from "@/store/features/form/formSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openModal, command } from "@/store/features/modal/modalSlice";
import { selectData } from "@/store/features/data/dataSlice";

export default function FixedTable({ header }: any) {
    const fixedData = useAppSelector(selectData).billsData[0].items.filter((item: any) => (item.type === "fixed" && item.active === true));

    const total = fixedData.reduce((partialSum, a) => partialSum + a.value, 0);

    const dispatch = useAppDispatch();

    const rows = fixedData.map((item: BillsDataItemType) => (
        <ItemFixedTable key={item.id} item={item} />
    ));

    return (
        <DefaultTable title="Fixos" onAddAction={() => {
            dispatch(command({
                ...initialValues,
                type: "fixed"
            }));
            dispatch(openModal())
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