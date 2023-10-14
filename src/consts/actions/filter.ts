import { FilterOptions } from '@/lib/utils';
import { BillsDataItem } from '@/types/Data';

export const initialFilterValue: FilterOptions<BillsDataItem> = {
	type: [],
	categoryId: [],
	class: [],
};
