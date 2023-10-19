import { IconEffectivate } from '@/components/Icons';
import { useColors } from '@/lib/theme';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import { useContext } from 'react';
import { ActionDefault, ActionProps } from '../../ActionDefault';

interface ActionActivateProps extends Partial<ActionProps> {
	item: Transaction;
}

export function ActionActivateItem({ item, size, stroke, variant, color }: ActionActivateProps) {
	const data = useContext(DataContext);
	const colors = useColors();
	const defaultColor = colors.text.primary;

	return (
		<ActionDefault
			tooltip="Ativar"
			color={color || defaultColor}
			action={() =>
				data.item.update({
					...item,
					active: true,
				})
			}
			title={`Deseja ativar o item ${item.label}?`}
			variant={variant || 'subtle'}
			icon={
				<IconEffectivate
					size={size || '1rem'}
					stroke={stroke || 1.5}
					color={color || defaultColor}
				/>
			}
		/>
	);
}
