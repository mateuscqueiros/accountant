export interface ItemForm {
	label: string;
	value: number | '';
	date: Date;
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
	walletId: string | null;
}

export type TransferDataForm = {
	date: Date;
	fixed: boolean;
	installments: boolean;
	transform: number;
	monthly: boolean;
	action: 'replace' | 'add';
};

export type CategoryForm = {
	value: string;
	label: string;
	color: string;
};

export type WalletForm = {
	id: number;
	label: string;
	slug: string;
	default: boolean;
	value: string;
};
