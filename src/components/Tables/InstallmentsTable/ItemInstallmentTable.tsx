import { format } from '@/utils/index';
import { BillsDataItemType } from 'data';

export function ItemInstallmentTable({ item }: { item: BillsDataItemType }) {
    return (
        <tr>
            <td>{item.label}</td>
            <td>{item.value}</td>
            <td>{item.currentInstallment} / {item.totalInstallments}</td>
            <td>{format(item.date ?? new Date(), "dd")}</td>
        </tr>
    );
}