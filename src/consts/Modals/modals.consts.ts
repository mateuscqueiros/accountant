import { itemFormInitialValues, transferDataForminitialValues } from '@/consts/forms/forms.consts';
import { ItemModal, TransferDataModal } from 'src/types/Modals/modals.types';

export const itemModalInitialValues: ItemModal = {
	opened: false,
	command: {
		...itemFormInitialValues,
	},
	updateItem: '',
	action: 'create',
};

export const transferDataModalInitialValues: TransferDataModal = {
	opened: false,
	action: 'add',
	from: new Date().toString(),
	to: undefined,
	command: transferDataForminitialValues,
};
