import { BillsDataItem } from '@/types/Data';

interface OrderItemFn {
	items: BillsDataItem[];
	prop: keyof BillsDataItem;
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
export function orderItems(items: BillsDataItem[], prop: keyof BillsDataItem, invert?: boolean) {
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
