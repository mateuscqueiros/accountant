import { openUpdateModal, setUpdateItem } from '@/store/features/modal/modalSlice';
import { useAppDispatch } from '@/store/hooks';
import { BillsDataItemType } from 'src/data';

export function ItemFixedTable({ item }: { item: BillsDataItemType }) {
    const dispatch = useAppDispatch();

    return (
        <tr style={{ cursor: "pointer", opacity: item.active ? 1 : 0.5 }} onClick={() => {
            dispatch(openUpdateModal(item));
        }}>
            <td>{item.label}</td>
            <td>{item.value}</td>
            <td>{item.fixed.dueDay}</td>
        </tr>
    );
}