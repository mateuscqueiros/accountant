import { Category, UserData } from '@/types/Data';
import { startOfMonth } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export const defaultCategories: Category[] = [
	{
		id: 1,
		label: 'Carro',
		slug: 'carro',
		color: 'violet.6',
	},
	{
		label: 'Casa',
		slug: 'casa',
		id: 2,
		color: 'orange.6',
	},
	{
		label: 'Investimento',
		slug: 'investimento',
		id: 3,
		color: 'red.6',
	},
	{
		label: 'Roupas',
		slug: 'roupas',
		id: 4,
		color: 'green.6',
	},
	{
		label: 'Entretenimento',
		slug: 'entretenimento',
		id: 5,
		color: 'indigo.6',
	},
	{
		label: 'Assinaturas',
		slug: 'assinaturas',
		id: 6,
		color: 'yellow.6',
	},
	{
		label: 'Outros',
		slug: 'outros',
		id: 0,
		color: 'blue.6',
		default: true,
	},
];

export const defaultData: UserData = {
	activeMonth: startOfMonth(new Date()),
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
			date: new Date('09/01/2023'),
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
			date: new Date('09/23/2023'),
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
			value: 1200,
			date: new Date('09/12/2023'),
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
			date: new Date('9/7/2023'),
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
			date: new Date('07/14/2023'),
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
			date: new Date('06/13/2023'),
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
			date: new Date('06/08/2023'),
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
			categoryId: 7,
			value: 24,
			date: new Date('06/10/2023'),
			type: 'monthly',
			class: 'recipe',
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
			categoryId: 6,
			value: 24,
			date: new Date('03/10/2023'),
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
			categoryId: 3,
			value: 24,
			date: new Date('06/10/2023'),
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
			label: 'Luffy',
			categoryId: 4,
			value: 24,
			date: new Date('10/12/2023'),
			type: 'monthly',
			class: 'recipe',
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
			label: 'Zoro',
			categoryId: 3,
			value: 2400,
			date: new Date('10/20/2023'),
			type: 'monthly',
			class: 'recipe',
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
			label: 'Nami',
			categoryId: 1,
			value: 120,
			date: new Date('10/26/2023'),
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
			label: 'Usopp',
			categoryId: 5,
			value: 24,
			date: new Date('10/21/2023'),
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
			label: 'Sanji',
			categoryId: 5,
			value: 24,
			date: new Date('10/21/2023'),
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
			label: 'Robin',
			categoryId: 1,
			value: 22.7,
			date: new Date('10/21/2023'),
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
			label: 'Brook',
			categoryId: 0,
			value: 55.7,
			date: new Date('10/21/2023'),
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
	],
};