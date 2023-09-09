import { ModalsContext } from '@/contexts/ModalsContext';
import { useContext } from 'react';
import { BillsDataItemType } from 'src/data';

export function ItemInstallmentTable({ item }: { item: BillsDataItemType }) {
	const modals = useContext(ModalsContext);

	return (
		<tr
			style={{ cursor: 'pointer', opacity: item.active ? 1 : 0.5 }}
			onClick={() => {
				modals.item.openUpdate(item);
			}}
		>
			<td>{item.label}</td>
			<td>{item.value}</td>
			<td>
				{item.installments.current} / {item.installments.total}
			</td>
			<td>{item.installments.dueDay}</td>
		</tr>
	);
}
