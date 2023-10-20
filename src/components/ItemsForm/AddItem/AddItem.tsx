import { ActionIcon } from '@/components/Icons';
import { ModalsContext } from '@/providers/ModalsProvider';
import { ActionIconProps, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useContext } from 'react';

export function AddItem({ size, variant, color }: ActionIconProps) {
	const modal = useContext(ModalsContext).item;

	return (
		<Tooltip label="Adicionar transferência">
			<ActionIcon
				data-testid="open-modal-form"
				size={size || '2.1rem'}
				variant={variant || 'default'}
				color={color || 'default'}
				onClick={() => {
					modal.reset();
					modal.open();
				}}
			>
				<IconPlus size={size || '1.3rem'} />
			</ActionIcon>
		</Tooltip>
	);
}
