import { Category, Transaction } from '@/types/data';
import { getCategoriesExpensesTotals, getCategoryById } from './categories';
import { getPercentageArray } from './utils';

export function getCategoryStatistics(items: Transaction[], categories: Category[]) {
	let categoriesValues = getCategoriesExpensesTotals(items);
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
				color: getCategoryById(categoriesValues[index].id).color,
			};
		});
	}

	return statistics;
}

export function getTotalValues(data: Transaction[]) {
	let expenses = 0;
	let recipes = 0;

	expenses = data
		.filter((item) => item.active && !(item.class === 'recipe'))
		.reduce((partialSum, a) => partialSum + a.value, 0);

	recipes = data
		.filter((item) => item.active && item.class === 'recipe')
		.reduce((partialSum, a) => partialSum + a.value, 0);

	return { expenses, recipes };
}
