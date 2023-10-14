import { IconFixed, IconInstallment, IconMonthly } from '@/components/Icons';
import { Transaction } from '@/types/data';

export function getItemTypeIcon(type: Transaction['type']) {
	switch (type) {
		case 'fixed':
			return IconFixed;
		case 'installment':
			return IconInstallment;
		case 'monthly':
			return IconMonthly;
	}
}
