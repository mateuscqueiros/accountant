import { IconFixed, IconInstallment, IconMonthly } from '@/components/Icons';
import { BillsDataItem } from '@/types/Data';

export function getItemTypeIcon(type: BillsDataItem['type']) {
	switch (type) {
		case 'fixed':
			return IconFixed;
		case 'installment':
			return IconInstallment;
		case 'monthly':
			return IconMonthly;
	}
}
