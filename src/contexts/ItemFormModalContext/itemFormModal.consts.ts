import { itemFormInitialValues } from '../ItemFormContext/itemForm.consts';
import { IFormModalType } from './itemFormModal.types';

export const itemFormModalInitialValues: IFormModalType = {
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
