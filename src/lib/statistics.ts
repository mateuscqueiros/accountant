import { Category, Transaction } from '@/types/data';
import { getCategoriesExpensesTotals, getCategoryById } from './categories';
import { getPercentageArray } from './utils';

export function getCategoryStatistics(items: Transaction[], categories: Category[]) {
	let categoriesValues = getCategoriesExpensesTotals(items, categories);
	let statistics: any[] = [
		{
			value: 100,
			color: 'gray',
			tooltip: 'Sem gastos',
		},
	];

	if (categoriesValues.length > 0) {
		let categoriesValuesToPercentage = getPercentageArray(
			categoriesValues.map((item) => item.value)
		);
		statistics = categoriesValuesToPercentage.map((item, index) => {
			return {
				value: item,
				tooltip: `${categoriesValues[index].label} (${categoriesValuesToPercentage[index]}%)`,
				color: getCategoryById(categoriesValues[index].id, categories).color,
			};
		});
	}

	return statistics;
}

/**
 * Recebe itens e retorna o total de gastos e receitas.
 * @param data Os itens a serem processados.
 * @returns Um objeto com os totais
 *  - `expenses` O total das despesas
 *  - `recipes` O total das receitas
 */
export function getTotalValues(data: Transaction[]) {
	let expenses = 0;
	let recipes = 0;
	let total = 0;

	expenses = data
		.filter((item) => item.active && item.class === 'expense')
		.reduce((partialSum, item) => partialSum + item.value, 0);

	recipes = data
		.filter((item) => item.active && item.class === 'recipe')
		.reduce((partialSum, item) => partialSum + item.value, 0);

	total = recipes - expenses;

	return { expenses, recipes, total };
}
