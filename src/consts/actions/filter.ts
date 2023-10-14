import { FilterOptions } from '@/lib/utils';
import { BillsDataItem } from '@/types/data';

export const initialFilterValue: FilterOptions<BillsDataItem> = {
	type: [],
	categoryId: [],
	class: [],
};
