import { startOfMonth } from 'date-fns';

export function compareStartOfMonth(param1: string, param2: string): boolean {
	/* Retorna verdadeiro se o início do mês das duas datas forem iguais */
	return startOfMonth(new Date(param1)).toString() === startOfMonth(new Date(param2)).toString();
}
