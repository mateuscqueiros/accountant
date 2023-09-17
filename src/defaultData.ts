import { startOfMonth } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { CategoryType, UserDataType } from './shared/types/data.types';

const defaultCategories: CategoryType[] = [
	{
		label: 'Carro',
		id: 1,
	},
	{
		label: 'Casa',
		id: 2,
	},
	{
		label: 'Investimento',
		id: 3,
	},
	{
		label: 'Roupas',
		id: 4,
	},
	{
		label: 'Entretenimento',
		id: 5,
	},
	{
		label: 'Assinaturas',
		id: 6,
	},
	{
		label: 'Outros',
		id: 0,
	},
];

const defaultData: UserDataType = {
	user: {
		name: 'Mateus Queirós',
		image: '/avatar.jpg',
		activeMonth: startOfMonth(new Date()).toString(),
		categories: defaultCategories,
	},
	items: [
		{
			id: uuidv4(),
			label: 'Compras mensais',
			categoryId: 1,
			value: 255.6,
			date: new Date('09/01/2023').toString(),
			type: 'monthly',
			class: 'expense',
			installments: {
				current: 0,
				total: 0,
			},
			dueDay: 0,
			note: 'Uma nota que ninguém vai ler',
			active: true,
		},
		{
			id: uuidv4(),
			label: 'Compras fixas',
			categoryId: 0,
			value: 20,
			date: new Date('09/23/2023').toString(),
			type: 'fixed',
			class: 'expense',
			installments: {
				current: 0,
				total: 0,
			},
			dueDay: 12,

			note: 'Uma nota que ninguém vai ler',
			active: true,
		},
		{
			id: uuidv4(),
			label: 'Receita',
			categoryId: 0,
			value: 20,
			date: new Date('09/12/2023').toString(),
			type: 'fixed',
			class: 'recipe',
			installments: {
				current: 0,
				total: 0,
			},
			dueDay: 23,

			note: 'Uma nota que ninguém vai ler',
			active: true,
		},
		{
			id: uuidv4(),
			label: 'Compras parceladas',
			categoryId: 1,
			value: 20,
			date: new Date('9/7/2023').toString(),
			type: 'installment',
			class: 'expense',
			installments: {
				current: 10,
				total: 12,
			},
			dueDay: 17,

			note: 'Uma nota que ninguém vai ler',
			active: false,
		},
		{
			id: uuidv4(),
			label: 'Compras mensal',
			categoryId: 1,
			value: 255.6,
			date: new Date('07/14/2023').toString(),
			type: 'monthly',
			class: 'expense',
			installments: {
				current: 0,
				total: 0,
			},
			dueDay: 0,
			note: 'Uma nota que ninguém vai ler',
			active: true,
		},
		{
			id: uuidv4(),
			label: 'Outras compras',
			categoryId: 1,
			value: 24,
			date: new Date('06/13/2023').toString(),
			type: 'monthly',
			class: 'expense',
			installments: {
				current: 0,
				total: 0,
			},
			dueDay: 0,

			note: 'Uma nota que ninguém vai ler',
			active: true,
		},
		{
			id: uuidv4(),
			label: 'Outras compras',
			categoryId: 1,
			value: 24,
			date: new Date('06/08/2023').toString(),
			type: 'monthly',
			class: 'expense',
			installments: {
				current: 0,
				total: 0,
			},
			dueDay: 0,
			note: 'Uma nota que ninguém vai ler',
			active: true,
		},
	],
};

export default defaultData;
