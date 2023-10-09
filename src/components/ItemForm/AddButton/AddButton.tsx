import { ModalsContext } from '@/providers/ModalsProvider';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useContext } from 'react';

export function ItemFormAddButton() {
	const modal = useContext(ModalsContext).item;

	return (
		<Tooltip label="Adicionar conta">
			<ActionIcon
				data-testid="open-modal-form"
				size="2.1rem"
				variant="default"
				onClick={() => {
					modal.reset();
					modal.open();
				}}
			>
				<IconPlus size="1.3rem" />
			</ActionIcon>
		</Tooltip>
	);
}
