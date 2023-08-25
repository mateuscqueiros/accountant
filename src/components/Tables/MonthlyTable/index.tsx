import DefaultTable from "..";
import { useEffect, useState } from "react";
import { BillsDataItemType } from "data";
import { ItemMonthlyTable } from "@/components/Tables/MonthlyTable/ItemMonthlyTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { command, openModal } from "@/store/features/modal/modalSlice";
import { useSelector } from "react-redux";
import { selectData } from "@/store/features/data/dataSlice";
import { initialValues } from "@/components/Layout/Components/AddBill";

export default function MonthlyTable({ header }: any) {
    const monthlyData = useAppSelector(selectData).billsData[0].items.filter((item: any) => (item.type === "monthly" && item.active === true));
    const total = monthlyData.reduce((partialSum, a) => partialSum + a.value, 0);

    const rows = monthlyData.map((item: BillsDataItemType) => (
        <ItemMonthlyTable key={item.id} item={item} />
    ))

    const dispatch = useAppDispatch();

    return (
        <DefaultTable title="Mensais" onAddAction={() => {
            dispatch(command({
                ...initialValues,
                type: "monthly"
            }));
            dispatch(openModal());
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