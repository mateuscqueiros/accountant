import { randomDate, randomInt } from '@/lib/utils';
import { Transaction } from '@/types/data';
import { v4 as uuidv4 } from 'uuid';

interface MinMaxOverrides {
	min: number;
	max: number;
}

interface MinMaxDateOverrides {
	min: Date;
	max: Date;
}

interface GenerateTransactionOverrides {
	date?: MinMaxDateOverrides;
	value?: MinMaxOverrides;
	categoryId?: MinMaxOverrides;
	dueDay?: MinMaxOverrides;
	active?: boolean;
	label?: string;
	type?: Transaction['type'];
	class?: Transaction['class'];
	note?: string;
}

/**
 * Gera uma transação com valores aleatórios.
 * @param options Um objeto para sobrescrever o valor de alguma propriedade
 */
export function generateTransaction(options?: GenerateTransactionOverrides) {
	const mockLabels: Transaction['label'][] = [
		'Luffy',
		'Zoro',
		'Nami',
		'Ussop',
		'Sanji',
		'Chopper',
		'Robin',
		'Brook',
		'Jinbe',
	];
	const mockValue = (options && options.value) || {
		min: 1,
		max: 2000,
	};
	const mockType: Transaction['type'][] = ['monthly', 'fixed', 'installment'];

	const mockClass: Transaction['class'][] = ['expense', 'recipe'];
	const mockDate = (options && options.date) || {
		min: new Date(2023, 0, 1),
		max: new Date(2024, 11, 30),
	};

	const mockCategoryId = (options && options.categoryId) || {
		min: 0,
		max: 6,
	};

	const mockDueDay = (options && options.dueDay) || {
		min: 1,
		max: 28,
	};

	const mockNote = 'Uma nota que ninguém vai ler';
	const mockActive: Transaction['active'][] = [false, true];

	const objValue = randomInt(mockValue.min, mockValue.max);
	const objDate = randomDate(mockDate.min, mockDate.max);
	const objCategoryId = randomInt(mockCategoryId.min, mockCategoryId.max, { integer: true });
	const objDueDay = randomInt(mockDueDay.min, mockDueDay.max, { integer: true });
	const objLabel =
		(options && options.label) ||
		mockLabels[randomInt(0, mockLabels.length - 1, { integer: true })];
	const objType =
		(options && options.type) || mockType[randomInt(0, mockType.length - 1, { integer: true })];
	const objClass =
		(options && options.class) || mockClass[randomInt(0, mockClass.length - 1, { integer: true })];
	const objNote = (options && options.note) || mockNote;
	const objActive =
		(options && options.active) ||
		mockActive[randomInt(0, mockActive.length - 1, { integer: true })];

	const installmentTotal = randomInt(0, 12);
	const installmentCurrent = randomInt(0, installmentTotal - 1);

	const randomTransaction: Transaction = {
		id: uuidv4(),
		label: objLabel,
		value: objValue,
		type: objType,
		class: objClass,
		date: objDate,
		categoryId: objCategoryId,
		installments: {
			current: installmentCurrent,
			total: installmentTotal,
		},
		dueDay: objDueDay,
		note: objNote,
		active: objActive,
	};

	return randomTransaction;
}