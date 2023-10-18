import { Transaction } from '@/types/data';
import { v4 as uuidv4 } from 'uuid';

interface RandomOptions {
	integer: boolean;
}

/**
 * Gera um número aleatório dentro do intervalo especificado. Se min e max não forem providos o intervalo será entre 0 e 100
 * @param min O intervalo mínimo
 * @param max O intervalo máximo
 * @param options Objeto de opções.
 * - `integer` Se o número deve ou não ser inteiro
 */
function random(min?: number, max?: number, options?: RandomOptions) {
	let minRange = 0;
	let maxRange = 100;
	let integer = options?.integer || true;

	if (min) {
		minRange = min;
	}
	if (max) {
		maxRange = max;
	}

	let randomNum = Math.random() * (maxRange - minRange) + minRange;

	if (integer) {
		randomNum = Math.round(randomNum);
	}

	return randomNum;
}

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
}

/**
 * Gera uma transação com valores aleatórios.
 * @param user O usuário atual. Utilizado para detectar a quantidade de categorias.
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

	const objLabel = mockLabels[random(0, mockLabels.length - 1, { integer: true })];
	const objValue = random(mockValue.min, mockValue.max);
	const objType = mockType[random(0, mockType.length - 1, { integer: true })];
	const objClass = mockClass[random(0, mockClass.length - 1, { integer: true })];
	const objDate = generateDate(mockDate.min, mockDate.max);
	const objCategoryId = random(mockCategoryId.min, mockCategoryId.max, { integer: true });
	const objDueDay = random(mockDueDay.min, mockDueDay.max, { integer: true });
	const objNote = mockNote;
	const objActive = mockActive[random(0, mockActive.length - 1, { integer: true })];

	const installmentTotal = random(0, 12);
	const installmentCurrent = random(0, installmentTotal - 1);

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

	console.log(randomTransaction);

	return randomTransaction;
}

/**
 * Gera uma data aleatória dentro do intervalo provido
 * @param from O intervalo mínimo
 * @param to O intervalo máximo
 */
function generateDate(from: Date, to: Date) {
	return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}
