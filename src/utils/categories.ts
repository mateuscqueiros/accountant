import { BillsDataItem, Category } from 'src/types/Data/data.types';
import { CategoryForm } from 'src/types/Forms/forms.types';

export type CategoryValue = {
	id: number;
	value: number;
	label: string;
};

const colors = ['cyan', 'orange', 'grape', 'teal', 'blue', 'yellow', 'orange', 'red'];

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

	if (foundCategory !== undefined) {
		return {
			id: foundCategory.id,
			label: foundCategory.label,
			color: foundCategory.color,
		};
	} else {
		return {
			id: 0,
			label: 'Outros',
			color: 'blue',
		};
	}
}

export function getNextCategoryId(categories: Category[]): number {
	return (
		Math.max.apply(
			null,
			categories.map((item) => item.id)
		) + 1
	);
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

export function getNextCategoryColor(categories: Category[]): string {
	if (categories.length + 1 > colors.length) {
		return colors[0];
	} else {
		return colors[categories.length + 1];
	}
}
