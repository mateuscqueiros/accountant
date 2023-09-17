import { BillsDataItemType, CategoryType } from '@/shared/types/data.types';
import { CategoryFormType } from '@/shared/types/forms.types';

export type CategoryValueType = {
	id: number;
	value: number;
	label: string;
};

export function getCategoriesLabels(categories: CategoryType[]): CategoryFormType[] {
	return categories.map((category) => {
		return {
			value: category.id.toString(),
			label: category.label,
		};
	});
}

export function getCategory(categories: CategoryType[], id: number): CategoryType | undefined {
	const foundCategory = categories.filter((category) => {
		return category.id === id;
	})[0];

	if (foundCategory !== undefined) {
		return {
			id: foundCategory.id,
			label: foundCategory.label,
		};
	} else return;
}

export function getNextId(categories: CategoryType[]): number {
	return (
		Math.max.apply(
			null,
			categories.map((item) => item.id)
		) + 1
	);
}

export function getCategoriesForm(categories: CategoryType[], id?: number): CategoryFormType[] {
	if (id !== undefined) {
		let foundCategory = getCategory(categories, id);
		if (foundCategory) {
			return [
				{
					value: String(foundCategory.id),
					label: foundCategory.label,
				},
			];
		} else return [];
	}
	return categories.map((category) => {
		return {
			value: String(category.id),
			label: category.label,
		};
	});
}

export function getCategoriesValues(data: BillsDataItemType[], categories: CategoryType[]) {
	let categoriesValues: CategoryValueType[] = [];

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
