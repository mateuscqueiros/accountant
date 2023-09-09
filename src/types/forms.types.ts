export type FormsContextType = {
	transform: {
		values: TransferDataForm;
	};
	item: {
		values: ItemForm;
		resetValues: () => void;
		setValue: (data: { field: string; newValue: any }) => void;
		setValues: (fields: ItemForm) => void;
	};
};

export type ItemForm = {
	label: string;
	value: number | '';
	date: string;
	type: string;
	tag: string;
	active: boolean;
	note: string;
	installments: {
		current: number | '';
		total: number | '';
		dueDay: number | '';
	};
	fixed: {
		dueDay: number | '';
	};
};

export type TransferDataForm = {
	date: string;
	fixed: boolean;
	installments: boolean;
	transform: number;
	monthly: boolean;
	action: string;
};
