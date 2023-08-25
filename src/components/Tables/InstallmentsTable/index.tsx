import DefaultTable from "..";
import { BillsDataItemType } from "data";
import { ItemInstallmentTable } from "./ItemInstallmentTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { command, openModal } from "@/store/features/modal/modalSlice";
import { selectData } from "@/store/features/data/dataSlice";
import { initialValues } from "@/components/Layout/Components/AddBill";

export default function InstallmentsTable({ header, data, action, setForm }: any) {
    const installmentsData = useAppSelector(selectData).billsData[0].items.filter((item: any) => (item.type === "installment" && item.active === true));
    const total = installmentsData.reduce((partialSum, a) => partialSum + a.value, 0);

    const rows = installmentsData.map((item: BillsDataItemType) => (
        <ItemInstallmentTable key={item.id} item={item} />
    ));

    const dispatch = useAppDispatch();

    return (
        <DefaultTable title="Parcelados" action={action} onAddAction={() => {
            dispatch(command({
                ...initialValues,
                type: "installment"
            }));
            dispatch(openModal());
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