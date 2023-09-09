import { ModalsContext } from '@/contexts/ModalsContext';
import { useContext } from 'react';
import { BillsDataItemType } from 'src/data';

export function ItemFixedTable({ item }: { item: BillsDataItemType }) {
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
			<td>{item.fixed.dueDay}</td>
		</tr>
	);
}
