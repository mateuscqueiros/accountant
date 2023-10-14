import { BillsDataItem, Category } from '@/types/data/data.types';
import { CategoryForm } from '@/types/forms/forms.types';

export function getCategoriesLabels(categories: Category[]): CategoryForm[] {
	return categories.map((category) => {
		return {
			value: String(category.id),
			label: category.label,
			color: category.color,
		};
	});
}

export function getCategory(categories: Category[], id: number): Category {
	const foundCategory = categories.filter((category) => {
		return category.id === id;
	})[0];

	if (foundCategory === undefined) {
		const defaultCategory = categories.filter((category) => {
			return category.default === true;
		})[0];

		return defaultCategory;
	}

	return {
		id: foundCategory.id,
		slug: foundCategory.slug,
		label: foundCategory.label,
		color: foundCategory.color,
	};
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
		let foundCategory = getCategory(categories, id);
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

export type CategoryValue = {
	id: number;
	value: number;
	label: string;
};

export function getCategoriesExpensesTotals(data: BillsDataItem[], categories: Category[]) {
	let categoriesValues: CategoryValue[] = [];

	data.map((item) => {
		if (item.class === 'recipe') {
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
			label: getCategory(categories, item.categoryId).label,
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

export function getCategoryById(categories: Category[], id: number): Category {
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
