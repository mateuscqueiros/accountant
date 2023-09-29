import { BillsDataItem } from '../types';

export function getItemTypeLabel(type: BillsDataItem['type']) {
	switch (type) {
		case 'fixed':
			return 'Fixo';
		case 'installment':
			return 'Parcelado';
		case 'monthly':
			return 'Mensal';
		default:
			return 'Sem tipo';
	}
}
