import { IconDelete } from '@/components/Icons';
import { useColors } from '@/lib/theme';
import { DataContext } from '@/providers/DataProvider';
import { Category } from '@/types/data';
import { useContext } from 'react';
import { ActionDefault, ActionProps } from '../../ActionDefault';

interface ActionDeleteProps extends Partial<ActionProps> {
	category: Category;
}

export function ActionDeleteCategory({
	category,
	size,
	stroke,
	variant,
	color,
}: ActionDeleteProps) {
	const data = useContext(DataContext);
	const colors = useColors();
	const defaultColor = colors.expenses;

	return (
		<ActionDefault
			tooltip="Deletar"
			color={color || defaultColor}
			action={() => data.category.delete(category.id)}
			title={`Deseja deletar a categoria ${category.label}?`}
			variant={variant || 'subtle'}
			icon={
				<IconDelete stroke={stroke || 1.5} size={size || '1rem'} color={color || defaultColor} />
			}
		/>
	);
}
