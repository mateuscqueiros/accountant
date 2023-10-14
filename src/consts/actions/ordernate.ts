import { OrdersOptions } from '@/components/Transactions';

/**
 *  - `0` - Nenhuma verificação é feita, os itens são retornados como vieram.
 * 	- `1` - Os itens serão ordenados (ordem alfabética ou numérica)
 * 	- `2` - Os itens serão ordenados porém invetidos (ordem alfabética ou numérica)
 */
export const initialOrdernateValue: OrdersOptions = {
	label: 0,
	categoryId: 0,
	date: 0,
	type: 0,
	value: 0,
};
