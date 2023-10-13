import { BillsDataItem, Category } from 'src/types/Data/data.types';
import { CategoryForm } from 'src/types/Forms/forms.types';

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

export function getCategoriesValues(data: BillsDataItem[], categories: Category[]) {
	let categoriesValues: CategoryValue[] = [];

	data.map((item) => {
		if (!(item.class === 'recipe') && item.active) {
			if (categoriesValues.some((category) => category.id === item.categoryId)) {
				let categoryToUpdateValue = categoriesValues.filter((categoryValue) => {
					return categoryValue.id === item.categoryId;
				})[0];
				categoryToUpdateValue.value = categoryToUpdateValue.value + item.value;

				let otherCategoryValues = categoriesValues.filter((categoryValue) => {
					return categoryValue.id !== item.categoryId;
				});

				categoriesValues = [...otherCategoryValues, categoryToUpdateValue];
			} else {
				const category = getCategory(categories, item.categoryId);
				if (category) {
					categoriesValues = [
						...categoriesValues,
						{ id: category.id, value: item.value, label: category.label },
					];
				}
			}
		}
	});

	return categoriesValues;
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
