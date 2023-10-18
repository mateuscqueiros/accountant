import { Transaction, User } from '@/types/data';
import { v4 as uuidv4 } from 'uuid';

/**
 * Gera um número aleatório dentro do intervalo especificado
 * @param min O intervalo mínimo
 * @param max O intervalo máximo
 */
function random(min?: number, max?: number) {
	let minRange = 0;
	let maxRange = 1;

	if (min) {
		minRange = min;
	}
	if (max) {
		maxRange = max;
	}

	return Math.random() * (maxRange - minRange) + minRange;
}

export function generateRandomTransaction(user: User, quantity: number) {
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
	const mockValue = {
		min: 1,
		max: 2000,
	};
	const mockType: Transaction['type'][] = ['monthly', 'fixed', 'installment'];

	const mockClass: Transaction['class'][] = ['expense', 'recipe'];
	const mockDate = {
		min: new Date(2023, 1, 1),
		max: new Date(2024, 12, 30),
	};

	const mockCategoryId = {
		min: 0,
		max: user.categories.length - 1,
	};

	const mockDueDay = {
		min: 1,
		max: 28,
	};

	const mockNote = 'Uma nota que ninguém vai ler';
	const mockActive: Transaction['active'][] = [false, true];

	const randomLabel = mockLabels[random(0, mockLabels.length - 1)];
	const randomValue = random(mockValue.min, mockValue.max);
	const randomType = mockType[random(0, mockType.length - 1)];
	const randomClass = mockClass[random(0, mockClass.length - 1)];
	const randomDate = generateRandomDate(mockDate.min, mockDate.max);
	const randomCategoryId = random(mockCategoryId.min, mockCategoryId.max);
	const randomDueDay = random(mockDueDay.min, mockDueDay.max);
	const randomMockNote = mockNote;
	const randomActive = mockActive[random(0, mockActive.length - 1)];

	const randomInstallmentTotal = random(0, 12);
	const randomInstallmentCurrent = random(0, randomInstallmentTotal);

	const randomTransaction: Transaction = Object.create({
		id: uuidv4(),
		label: randomLabel,
		value: randomValue,
		type: randomType,
		class: randomClass,
		date: randomDate,
		installments: {
			current: randomInstallmentCurrent,
			total: randomInstallmentTotal,
		},
		categoryId: randomCategoryId,
		dueDay: randomDueDay,
		note: randomMockNote,
		active: randomActive,
	});

	return randomTransaction;
}

/**
 * Gera uma data aleatória dentro do intervalo provido
 * @param from O intervalo mínimo
 * @param to O intervalo máximo
 */
function generateRandomDate(from: Date, to: Date) {
	return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}
