import { ModalsContext } from '@/contexts/ModalsContext';
import { BillsDataItemType } from '@/shared/types/data.types';
import { getDay } from 'date-fns';
import { useContext } from 'react';

export function DefaultItem({ item }: { item: BillsDataItemType }) {
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
				<td>{getDay(new Date(item.date))}</td>
				<td>
					{item.type === 'installment'
						? `${item.installments.current} / ${item.installments.total}`
						: 'Sem'}
				</td>
				<td>{item.type === 'monthly' ? 'Sem' : item.dueDay}</td>
			</tr>
		</>
	);
}
