import { openUpdateModal, setUpdateItem } from '@/store/features/modal/modalSlice';
import { useAppDispatch } from '@/store/hooks';
import { BillsDataItemType } from 'data';

export function ItemInstallmentTable({ item }: { item: BillsDataItemType }) {
  const dispatch = useAppDispatch();

  return (
    <tr style={{ cursor: "pointer" }} onClick={() => {
      dispatch(openUpdateModal(item));
    }}>
      <td>{item.label}</td>
      <td>{item.value}</td>
      <td>{item.installments.current} / {item.installments.total}</td>
      <td>{item.installments.dueDay}</td>
    </tr>
  );
}