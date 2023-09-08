import { ItemFormType } from './itemForm.types';

export const itemFormInitialValues: ItemFormType = {
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
