import { IconArrowDown, IconArrowUp } from '@/components/Icons';
import { initialOrdernateValue } from '@/consts/actions';
import { orderItems } from '@/lib/utils';
import { BillsDataItem } from '@/types/data';
import { Box, Flex, Table, Text } from '@mantine/core';
import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';

export interface OrdersOptions {
	label: number;
	categoryId: number;
	date: number;
	type: number;
	value: number;
}

interface TableHeaderOrderProps {
	children: string;
	prop: keyof OrdersOptions;
	items: BillsDataItem[];
	ordenationState: [OrdersOptions, Dispatch<SetStateAction<OrdersOptions>>];
	setData: Dispatch<SetStateAction<BillsDataItem[]>>;
	hiddenMobile?: boolean;
}

/**
 * Item que serve como item de um header de tabela. Ordena os itens recebidos com base em uma propriedade e seta eles em uma função recebida.
 * @param label Nome do item para mostrar
 * @param prop Propriedade dos itens para ordenação
 * @param items Items para ordernar
 * @param setData Uma função para setar os dados
 * @param hiddenMobile Se o item deve ser oculto no Mobile ou não
 * @param options Um objeto com opções de ordenação. Cada opção é uma key de um item. Seu valor é um número:
 *  - `0` - A sequência retornada é a recebida em `items`
 * 	- `1` - Os itens serão ordenados (ordem alfabética ou numérica)
 * 	- `2` - Os itens serão ordenados porém invetidos (ordem alfabética ou numérica)
 */
export function TableHeaderItem({
	children,
	prop,
	items,
	ordenationState,
	setData,
	hiddenMobile,
}: PropsWithChildren<TableHeaderOrderProps>) {
	const mobileBreakpoint = 'sm';

	const optionIcons = [undefined, <IconArrowDown size="1rem" />, <IconArrowUp size="1rem" />];

	const [ordenation, setOrdenation] = ordenationState;
	const [icon, setIcon] = useState(optionIcons[ordenation[prop]]);

	const setNextOrder = useCallback(
		(prop: keyof OrdersOptions) => {
			const propValue = ordenation[prop];
			const next = propValue > 1 ? 0 : propValue + 1;

			setOrdenation({
				...initialOrdernateValue,
				[prop]: next,
			});
			setIcon(optionIcons[next]);

			if (next === 0) {
				setData(items);
				return;
			}
			if (next === 1) {
				setData(orderItems(items, prop));
				return;
			}
			if (next === 2) {
				setData(orderItems(items, prop, true));
			}
		},
		[ordenationState]
	);

	useEffect(() => {
		let indexOfIcon = ordenation[prop];
		setIcon(optionIcons[indexOfIcon]);
	}, [ordenation]);

	return (
		<Table.Th
			style={{ cursor: 'pointer' }}
			visibleFrom={hiddenMobile ? mobileBreakpoint : undefined}
			onClick={() => {
				setNextOrder(prop);
			}}
		>
			<Flex align="center" gap="xs">
				<Text>{children}</Text>
				<Box miw={20} h="full">
					<Flex justify="center">{icon}</Flex>
				</Box>
			</Flex>
		</Table.Th>
	);
}
