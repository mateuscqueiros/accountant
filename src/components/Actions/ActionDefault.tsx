import { confirmModal } from '@/lib/modals';
import { ActionIcon, Tooltip } from '@mantine/core';

export interface ActionProps {
	size?: string;
	stroke?: number;
	variant: string;
	action: () => void;
	title: string;
	color: string;
	icon: JSX.Element;
	tooltip: string;
}

export function ActionDefault({ action, title, variant, color, icon, tooltip }: ActionProps) {
	return (
		<Tooltip label={tooltip}>
			<ActionIcon
				onClick={(e) => {
					e.stopPropagation();
					confirmModal({
						title,
						onConfirm: () => action(),
					});
				}}
				variant={variant}
				color={color}
			>
				{icon}
			</ActionIcon>
		</Tooltip>
	);
}
