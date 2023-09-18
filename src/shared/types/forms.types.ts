export interface ItemForm {
	label: string;
	value: number | '';
	date: string;
	type: 'monthly' | 'installment' | 'fixed';
	class: 'recipe' | 'expense';
	categoryId: string | null;
	active: boolean;
	note: string;
	installments: {
		current: number | '';
		total: number | '';
	};
	dueDay: number | '';
	// fixed: {
	// 	dueDay: number | '';
	// };
}

export type TransferDataForm = {
	date: string;
	fixed: boolean;
	installments: boolean;
	transform: number;
	monthly: boolean;
	action: 'replace' | 'add';
};

export type CategoryFormType = {
	value: string;
	label: string;
	color: string;
};
