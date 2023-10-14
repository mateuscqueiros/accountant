import { IconFixed, IconInstallment, IconMonthly } from '@/components/Icons';
import { BillsDataItem } from '@/types/data';

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
