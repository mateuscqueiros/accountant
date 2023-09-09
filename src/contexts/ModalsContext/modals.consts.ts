import { ItemModal, TransferDataModal } from '../../types/modals.types';
import { itemFormInitialValues } from '../FormsContext/forms.consts';

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
