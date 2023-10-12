import { modals } from '@mantine/modals';

interface ConfirmModalProps {
	title: string;
	children?: JSX.Element;
	onCancel?: () => void;
	onConfirm: () => void;
}

export const confirmModal = ({ title, children, onCancel, onConfirm }: ConfirmModalProps) => {
	modals.openConfirmModal({
		title,
		children,
		labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
		onCancel,
		onConfirm,
	});
};
