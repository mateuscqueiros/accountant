import { initialFilterValue } from '@/consts/actions';
import { FilterOptions, someKeyIsNotEmpty } from '@/lib/utils';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import { Anchor, Flex, Menu, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { ActionIcon, IconFilter, IconFilterFilled } from '../Icons';
import { FilterDataMenu } from './FilterDataMenu';

interface FilterDataProps {
	displayDataState: [Transaction[], Dispatch<SetStateAction<Transaction[]>>];
	filterState: [FilterOptions<Transaction>, Dispatch<SetStateAction<FilterOptions<Transaction>>>];
	data: Transaction[];
}

/**
 *
 * @param data Todos os itens que devem ser filtrados.
 * @param filterState Um estado com as opções de filtro a serem utilizadas.
 * @param displayDataState Um estado que possui os dados a serem mostrados após a filtragem.
 * @returns
 */
export function FilterData({ data, filterState, displayDataState }: FilterDataProps) {
	const dataProvider = useContext(DataContext);
	const theme = useMantineTheme();

	const [opened, setOpened] = useState(false);
	const [displayData] = displayDataState;
	const dataLength = data.length;

	const [filter, setFilters] = filterState;

	const isSmallMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

	return (
		<Menu
			shadow="md"
			width={200}
			closeOnItemClick={false}
			opened={opened}
			onChange={setOpened}
			position={isSmallMobile ? 'right-start' : 'left-start'}
		>
			<Menu.Target>
				<ActionIcon>
					{someKeyIsNotEmpty(filter) ? (
						<IconFilterFilled size="1.2rem" />
					) : (
						<IconFilter size="1.2rem" />
					)}
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>
					<Flex justify="space-between">
						<Text fz="xs" fw={500}>
							{someKeyIsNotEmpty(filter)
								? `${displayData.length} de ${dataLength} itens`
								: `${dataLength} itens`}
						</Text>
						<Anchor
							fz="xs"
							onClick={() => {
								setOpened((prev) => !prev);
								setFilters(initialFilterValue);
							}}
						>
							Resetar
						</Anchor>
					</Flex>
				</Menu.Label>
				<FilterDataMenu data={data} displayDataState={displayDataState} filterState={filterState} />
			</Menu.Dropdown>
		</Menu>
	);
}
