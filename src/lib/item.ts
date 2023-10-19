import { IconFixed, IconInstallment, IconMonthly } from '@/components/Icons';
import { Transaction } from '@/types/data';

/**
 * Retorna um ícone para o "type" provido
 * @param type O tipo de um item
 */
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
