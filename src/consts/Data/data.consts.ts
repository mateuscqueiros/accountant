import { Category, UserData } from '@/types/Data';
import { startOfMonth } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export const defaultCategories: Category[] = [
	{
		id: 1,
		label: 'Carro',
		color: 'violet-6',
	},
	{
		label: 'Casa',
		id: 2,
		color: 'orange-6',
	},
	{
		label: 'Investimento',
		id: 3,
		color: 'red-6',
	},
	{
		label: 'Roupas',
		id: 4,
		color: 'green-6',
	},
	{
		label: 'Entretenimento',
		id: 5,
		color: 'teal-6',
	},
	{
		label: 'Assinaturas',
		id: 6,
		color: 'yellow-6',
	},
	{
		label: 'Outros',
		id: 0,
		color: 'blue-6',
		default: true,
	},
];

export const defaultData: UserData = {
	activeMonth: startOfMonth(new Date()).toString(),
	user: {
		name: 'Mateus Queirós',
		image: '/avatar.jpg',
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
			categoryId: 1,
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
			categoryId: 1,
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