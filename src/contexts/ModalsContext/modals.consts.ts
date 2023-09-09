import { itemFormInitialValues } from '@/shared/consts/forms.consts';
import { ItemModal, TransferDataModal } from '../../shared/modals.types';

export const itemModalInitialValues: ItemModal = {
	opened: false,
	command: {
		...itemFormInitialValues,
		installments: {
			...itemFormInitialValues.installments,
		},
		fixed: {
			...itemFormInitialValues.fixed,
		},
	},
	updateItem: '',
	action: 'create',
};

export const transferDataModalInitialValues: TransferDataModal = {
	opened: false,
	from: new Date().toString(),
	to: undefined,
};
