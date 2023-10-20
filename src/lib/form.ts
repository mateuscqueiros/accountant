import { Transaction } from '@/types/data';
import { ItemForm } from '@/types/forms/forms.types';
import { FormValidateInput } from 'node_modules/@mantine/form/lib/types';

/** Obtém um objeto "validate" para o mantine, que valida os inputs ap submeter um formulário */
export function getValidateObject(): FormValidateInput<ItemForm> {
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
		walletId: undefined,
	};

	validate.label = (value) => {
		return value.length < 2 ? 'O nome deve ter pelo menos dois caracteres' : null;
	};

	validate.value = (value) => {
		return typeof value === 'number' && !(value > 0)
			? 'O valor deve ser maior que 0'
			: !value
			? 'Por favor insira um valor'
			: null;
	};

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

/* Obtêm um objeto "transform" para o mantine, que vai transformar os itens depois do submit */
export function getTransformObject(values: ItemForm): ItemForm {
	console.log('-----', values);

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
		transform = {
			...transform,
			categoryId: String(values.categoryId),
			walletId: String(values.walletId),
		};
	}

	if (values.walletId !== null) {
		transform = {
			...transform,
			walletId: String(values.walletId),
		};
	}

	return transform;
}

/** Adapta os itens do formulário (ItemForm) para inserção no banco (Transaction) */
export function sanitizeBeforeCommiting(id: string, values: ItemForm): Transaction {
	return {
		id,
		label: values.label,
		categoryId: values.categoryId !== null ? Number(values.categoryId) : 0,
		value: values.value === '' ? 0 : values.value,
		date: values.date,
		dueDay: values.dueDay === '' ? 0 : values.dueDay,
		installments: {
			current: values.installments.current === '' ? 0 : values.installments.current,
			total: values.installments.total === '' ? 0 : values.installments.total,
		},
		type: values.type as Transaction['type'],
		class: values.class as Transaction['class'],
		note: values.note,
		active: values.active,
		walletId: values.walletId !== null ? Number(values.walletId) : 0,
	};
}
