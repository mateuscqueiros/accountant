import { startOfMonth, subMonths } from 'date-fns';
import { ItemForm, TransferDataForm } from '../forms.types';

export const transferDataForminitialValues: TransferDataForm = {
	date: startOfMonth(new Date(subMonths(new Date(), 1).toString())).toString(),
	fixed: true,
	installments: true,
	transform: 0,
	monthly: false,
	action: 'add',
};

export const itemFormInitialValues: ItemForm = {
	label: '',
	value: 0,
	date: new Date().toString(),
	type: 'monthly',
	tag: 'Outros',
	active: true,
	note: '',
	installments: {
		current: 1,
		total: 2,
		dueDay: 1,
	},
	fixed: {
		dueDay: 1,
	},
};
