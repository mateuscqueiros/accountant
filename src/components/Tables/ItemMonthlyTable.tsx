import { ModalsContext } from '@/shared/consts';
import { format } from 'date-fns';
import { useContext } from 'react';
import { BillsDataItemType } from 'src/data';

export function ItemMonthlyTable({ item }: { item: BillsDataItemType }) {
	const modals = useContext(ModalsContext);

	return (
		<>
			<tr
				style={{ cursor: 'pointer', opacity: item.active ? 1 : 0.5 }}
				onClick={() => {
					modals.item.openUpdate(item);
				}}
			>
				<td>{item.label}</td>
				<td>{item.value}</td>
				<td>{format(new Date(item.date !== '' ? item.date : new Date()), 'dd')}</td>
			</tr>
		</>
	);
}
