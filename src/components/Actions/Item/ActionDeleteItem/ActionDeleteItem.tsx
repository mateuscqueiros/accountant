import { IconDelete } from '@/components/Icons';
import { useColors } from '@/lib/theme';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import { useContext } from 'react';
import { ActionDefault, ActionProps } from '../../ActionDefault';

interface ActionDeleteProps extends Partial<ActionProps> {
	item: Transaction;
}

export function ActionDeleteItem({
	item,
	size,
	stroke,
	variant,
	color,
	action,
}: ActionDeleteProps) {
	const data = useContext(DataContext);
	const colors = useColors();
	const defaultColor = colors.expenses;

	return (
		<ActionDefault
			tooltip="Deletar"
			color={color || defaultColor}
			action={() => data.item.delete(item.id)}
			title={`Deseja deletar o item ${item.label}?`}
			variant={variant || 'subtle'}
			icon={
				<IconDelete size={size || '1rem'} stroke={stroke || 1.5} color={color || defaultColor} />
			}
		/>
	);
}
