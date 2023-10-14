import { BillsDataItem, Category } from '@/types/data/data.types';
import { ItemForm } from '@/types/forms/forms.types';
import { FormValidateInput } from 'node_modules/@mantine/form/lib/types';
import { getCategory } from './categories';

export function getValidateObject(): FormValidateInput<ItemForm> {
	/* Obtém um objeto "validate" para o mantine, que valida os inputs */

	const validate: FormValidateInput<ItemForm> = {
		label: undefined,
		value: undefined,
		date: undefined,
		type: undefined,
		categoryId: undefined,
		active: undefined,
		installments: {
			current: undefined,
			total: undefined,
		},
		dueDay: undefined,
	};
	// Label
	validate.label = (value) => {
		return value.length < 2 ? 'O nome deve ter pelo menos dois caracteres' : null;
	};

	// Value
	validate.value = (value) => {
		return typeof value === 'number' && !(value > 0)
			? 'O valor deve ser maior que 0'
			: !value
			? 'Por favor insira um valor'
			: null;
	};
	// Date

	validate.installments = {
		current: (value, values) => {
			return values.type === 'installment'
				? typeof value === 'number' && value < 1
					? 'O valor mínimo é 1'
					: value >= values.installments.total
					? 'O valor deve ser menor que o total'
					: typeof value === 'string'
					? 'Por favor insira um valor'
					: null
				: null;
		},
		total: (value, values) => {
			return values.type === 'installment'
				? value && value < 2
					? 'O valor mínimo é 1'
					: typeof value === 'string' || !value
					? 'Por favor insira um valor'
					: null
				: null;
		},
	};

	validate.dueDay = (value, values) => {
		return values.type === 'installment' || values.type === 'fixed'
			? !value
				? 'Por favor insira um valor'
				: value && (value < 1 || value > 31)
				? 'O valor deve estar entre 1 e 31'
				: null
			: null;
	};
	return validate;
}

export function getTransformObject(values: ItemForm, categories: Category[]): ItemForm {
	/* Obtêm um objeto "transform" para o mantine, que vai transformar os itens depois do submit */

	let transform: ItemForm = {
		...values,
		date: values.date,
	};
	if (values.type === 'monthly') {
		transform = {
			...transform,
			dueDay: 0,
			installments: {
				current: 0,
				total: 0,
			},
		};
	}
	if (values.type === 'fixed') {
		transform = {
			...transform,
			installments: {
				current: 0,
				total: 0,
			},
		};
	}
	if (values.categoryId !== null) {
		const category = getCategory(categories, Number(values.categoryId));
		if (category) {
			transform = {
				...transform,
				categoryId: String(category.id),
			};
		}
	}

	return transform;
}

export function sanitizeBeforeCommiting(
	id: string,
	values: ItemForm,
	categories: Category[]
): BillsDataItem {
	/* Adapta os itens do formulário (ItemForm) para inserção no banco (BillDataItem) */
	const category = getCategory(categories, 0);

	return {
		id,
		label: values.label,
		categoryId:
			values.categoryId !== null
				? Number(values.categoryId)
				: Number(category !== undefined ? category.id : 0),
		value: values.value === '' ? 0 : values.value,
		date: values.date,
		dueDay: values.dueDay === '' ? 0 : values.dueDay,
		installments: {
			current: values.installments.current === '' ? 0 : values.installments.current,
			total: values.installments.total === '' ? 0 : values.installments.total,
			// dueDay: values.installments.dueDay === '' ? 0 : values.installments.dueDay,
		},
		// fixed: {
		// 	dueDay: values.fixed.dueDay === '' ? 0 : values.fixed.dueDay,
		// },
		type: values.type as BillsDataItem['type'],
		class: values.class as BillsDataItem['class'],
		note: values.note,
		active: values.active,
	};
}
