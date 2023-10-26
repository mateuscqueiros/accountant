import { IconDelete } from '@/components/Icons';
import { useColors } from '@/lib/theme';
import { DataContext } from '@/providers/DataProvider';
import { Wallet } from '@/types/data';
import { useContext } from 'react';
import { ActionDefault, ActionProps } from '../../ActionDefault';

interface ActionDeleteProps extends Partial<ActionProps> {
	wallet: Wallet;
}

export function ActionDeleteWallet({ wallet, size, stroke, variant, color }: ActionDeleteProps) {
	const data = useContext(DataContext);
	const colors = useColors();
	const defaultColor = colors.expenses;

	return (
		<ActionDefault
			tooltip="Deletar"
			color={color || defaultColor}
			action={() => data.wallet.delete(wallet.id)}
			title={`Deseja deletar a carteira ${wallet.label}?`}
			variant={variant || 'subtle'}
			icon={
				<IconDelete stroke={stroke || 1.5} size={size || '1rem'} color={color || defaultColor} />
			}
		/>
	);
}
