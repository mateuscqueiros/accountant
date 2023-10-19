import { Category, Transaction } from '@/types/data/data.types';
import { CategoryForm } from '@/types/forms/forms.types';

export type CategoryValue = {
	id: number;
	value: number;
	label: string;
};

export function getCategoriesLabels(categories: Category[]): CategoryForm[] {
	return categories.map((category) => {
		return {
			value: String(category.id),
			label: category.label,
			color: category.color,
		};
	});
}

export function getNextCategoryId(categories: Category[]): number {
	const nextId =
		Math.max.apply(
			null,
			categories.map((item) => item.id)
		) + 1;
	return nextId;
}

export function getCategoriesForm(categories: Category[], id?: number): CategoryForm[] {
	if (id !== undefined) {
		let foundCategory = getCategoryById(id, categories);
		if (foundCategory) {
			return [
				{
					value: String(foundCategory.id),
					label: foundCategory.label,
					color: foundCategory.color,
				},
			];
		} else return [];
	}
	return categories.map((category) => {
		return {
			value: String(category.id),
			label: category.label,
			color: category.color,
		};
	});
}

export function getCategoriesExpensesTotals(items: Transaction[], categories: Category[]) {
	let categoriesValues: CategoryValue[] = [];

	items.map((item) => {
		if (item.class === 'recipe' || !item.active) {
			return;
		}
		if (containsCategory(categoriesValues, item.categoryId)) {
			let categoryToUpdate = getCategoryValueItem(categoriesValues, item.categoryId);

			categoryToUpdate.value = categoryToUpdate.value + item.value;

			let otherCategories = categoriesValues.filter(
				(categoryValue) => categoryValue.id !== item.categoryId
			);

			categoriesValues = [...otherCategories, categoryToUpdate];
			return;
		}
		categoriesValues.push({
			id: item.categoryId,
			label: getCategoryById(item.categoryId, categories).label,
			value: item.value,
		});
	});

	return categoriesValues;
}

function containsCategory(categoriesValues: CategoryValue[], categoryId: number) {
	let contains = categoriesValues.some((categoryValue) => categoryValue.id === categoryId);

	return contains;
}

function getCategoryValueItem(categoriesValues: CategoryValue[], categoryId: number) {
	let categoryValue = categoriesValues.filter(
		(categoryValue) => categoryValue.id === categoryId
	)[0];

	return categoryValue;
}

export function getCategoryById(id: number, categories: Category[]): Category {
	return categories.filter((category) => category.id === id)[0];
}

export function sortCategories(categories: Category[]) {
	return categories.sort((a, b) => {
		if (a.default) {
			return 1;
		}
		return a.label.localeCompare(b.label);
	});
}
