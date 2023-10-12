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
