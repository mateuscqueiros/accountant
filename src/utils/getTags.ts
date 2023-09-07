import { BillsDataItemType } from 'src/data';

export function getTags(items: BillsDataItemType[]): string[] {
	// Percorre todos os itens em todos os Bills e retorna um array com as tags existentes

	let filterTags: string[] = [];
	items.map((item: BillsDataItemType) => {
		if (!filterTags.some((e) => e === item.tag)) {
			filterTags = [...filterTags, item.tag];
		}
	});

	return filterTags;
}

export type TagsAndValuesType = {
	value: number;
	label: string;
};

export function getTagsAndValues(
	items: BillsDataItemType[]
): TagsAndValuesType[] {
	// Recebe uma lista de itens e retorna um objeto com o valor total da categoria

	let tagsAndValues: TagsAndValuesType[] = [];
	const tags = getTags(items);

	if (tags.length > 0) {
		tags.map((itemTag) => {
			if (!tagsAndValues.some((tag) => tag.label === itemTag)) {
				tagsAndValues = [...tagsAndValues, { value: 0, label: itemTag }];
			}
		});
	}

	if (items.length > 0) {
		items.map((item) => {
			if (item.active) {
				let itemTagObj = tagsAndValues.filter((obj) => {
					return obj.label === item.tag;
				})[0];

				itemTagObj = {
					...itemTagObj,
					value: itemTagObj.value + item.value,
				};

				tagsAndValues = [
					...tagsAndValues.filter((obj) => obj.label !== itemTagObj.label),
					itemTagObj,
				];
			}
		});
	}

	return tagsAndValues;
}
