import { FilterOptions } from '@/lib/utils';
import { Transaction } from '@/types/data';

export const initialFilterValue: FilterOptions<Transaction> = {
	active: [],
	type: [],
	categoryId: [],
	class: [],
	walletId: [],
};
