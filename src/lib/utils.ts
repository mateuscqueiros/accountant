import { Transaction } from '@/types/data';

interface OrderItemFn {
	items: Transaction[];
	prop: keyof Transaction;
	invert?: boolean;
}

/**
 * Recebe um array de números e retorna um array de números na mesma sequência e valores percentuais correspondentes
 * @param items O array de números
 * @returns
 */
export function getPercentageArray(items: number[]): number[] {
	const total = items.reduce((partial, current) => partial + current);
	let itemsPercentage: number[] = [];

	items.map((item) => {
		itemsPercentage = [...itemsPercentage, Number(((100 * item) / total).toFixed(2))];
	});

	return itemsPercentage;
}

/**
 * Capitaliza a primeira letra da string
 * @param str A string para capitalizar a letra
 */
export function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Ordena transações com base em uma propriedade
 * @param items Os itens a serem ordenados
 * @param prop A propriedade para comparar
 * @param invert Se a ordem deve ser invertida
 */
export function orderItems(items: Transaction[], prop: keyof Transaction, invert?: boolean) {
	const inverse = invert !== undefined ? invert : false;

	const sortedItems = items.sort((a, b) => {
		if (a[prop] > b[prop]) {
			return inverse ? -1 : 0;
		}
		if (a[prop] < b[prop]) {
			return inverse ? 1 : -1;
		}
		return 0;
	});

	return sortedItems;
}

export type FilterOptions<T> = {
	[K in keyof Partial<Omit<T, 'installments'>>]: Array<T[K]>;
};

/**
 * Filtra itens com base nas opções passadas.
 * @param items Os itens a serem filtrados
 * @param options Opções para filtragem
 * @param contains Se verdadeiro, os itens retornados serão os que contiverem as opções passadas. (verdadeiro por padrão)
 */
export function filterItems(
	items: Transaction[],
	options: FilterOptions<Transaction>,
	contains?: boolean
) {
	let filteredItems = items;
	if (contains === undefined) {
		contains = true;
	}

	const keys = Object.keys(options);

	keys.map((k) => {
		const key = k as keyof FilterOptions<Transaction>;
		const values: any[] | undefined = options[key];

		if (values === undefined || !(values.length > 0)) {
			return;
		}

		filteredItems = filterItemsByKeyValues(filteredItems, key, values, contains);
	});

	return filteredItems;
}

/**
 * Define se a propriedade especificada tem um dos valores listados
 * @param item O item
 * @param prop A propriedade para verificar
 * @param values Array de valores. A propriedade deve conter um desses valores para retornar verdadeiro
 */
export function propHasValue(item: Transaction, prop: keyof Transaction, values: any[]) {
	const itemKeyValue = item[prop];

	return values.includes(itemKeyValue);
}

/**
 * Recebe uma lista de itens, uma propriedade e uma lista de valores. Retorna os itens que tem algum dos valores especificados na propriedade.
 * @param items Itens para filtrar.
 * @param key	A propriedade para verificar.
 * @param values Lista de valores que a propriedade pode assumir.
 * @param contains Se o item deve conter o valor ou não (true por padrão)
 */
export function filterItemsByKeyValues(
	items: Transaction[],
	key: keyof Transaction,
	values: any[],
	contains?: boolean
) {
	let filteredItems = items;

	filteredItems = items.filter((item) => {
		const itemHasValue = propHasValue(item, key, values);
		return contains ? itemHasValue : !itemHasValue;
	});

	return filteredItems;
}

/**
 * Mapeia as propriedades (que devem ser arrays) de um objeto. Retorna verdadeiro se alguma propriedade tiver mais de um item presente.
 * @param obj O objeto para verificar
 * @returns
 */
export function someKeyIsNotEmpty(obj: Object) {
	const keys = Object.keys(obj);

	let someKeyIsNotEmpty = keys.some((key) => {
		const values = obj[key as keyof Object];

		return values !== undefined && values.length > 0;
	});

	return someKeyIsNotEmpty;
}

/**
 * Retorna quantos itens tem o valor especificado em certa propriedade
 * @param items Itens para testar
 * @param prop A propriedade para verificar
 * @param value O valor que deve ser encontrado
 * @returns
 */
export function getNumberOfItemsByPropValue(
	items: Transaction[],
	prop: keyof Transaction,
	value: any
) {
	let count = 0;

	items.map((item) => {
		item[prop] === value ? count++ : null;
	});

	return count;
}

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
export function randomInt(min?: number, max?: number, options?: RandomOptions) {
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

/**
 * Gera uma data aleatória dentro do intervalo provido
 * @param from O intervalo mínimo
 * @param to O intervalo máximo
 */
export function randomDate(from: Date, to: Date) {
	return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}
