import { modals } from '@mantine/modals';
import { PropsWithChildren } from 'react';

interface ConfirmModalProps {
	title: string;
	onCancel?: () => void;
	onConfirm: () => void;
}

export const confirmModal = ({
	title,
	children,
	onCancel,
	onConfirm,
}: PropsWithChildren<ConfirmModalProps>) => {
	modals.openConfirmModal({
		title,
		children,
		labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
		onCancel,
		onConfirm,
	});
};
