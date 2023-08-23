import { BillsDataItemType } from 'data';

export function ItemFixedTable({ item }: { item: BillsDataItemType }) {
    return (
        <tr>
            <td>{item.label}</td>
            <td>{item.value}</td>
            <td>{item.due}</td>
        </tr>
    );
}