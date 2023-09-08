export interface ItemFormContextType extends IForm {
	resetItemFormValues: () => void;
	setItemFormValue: (data: { field: string; newValue: any }) => void;
	setItemFormValues: (fields: ItemFormType) => void;
}

/* Item Form */
export type IForm = {
	values: ItemFormType;
};

export type ItemFormType = {
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
