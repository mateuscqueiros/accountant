import { openUpdateModal, setUpdateItem } from '@/store/features/modal/modalSlice';
import { useAppDispatch } from '@/store/hooks';
import { format } from '@/utils/index';
import { BillsDataItemType } from 'data';

export function ItemMonthlyTable({ item }: { item: BillsDataItemType }) {
    const dispatch = useAppDispatch();

    return (
        <tr style={{ cursor: "pointer" }} onClick={() => {
            dispatch(openUpdateModal(item));
        }}>
            <td>{item.label}</td>
            <td>{item.value}</td>
            <td>{format(new Date(item.date ? item.date : new Date()), "dd")}</td>
        </tr>
    );
}