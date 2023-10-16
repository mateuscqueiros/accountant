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
}

export function FilterData({ displayDataState }: FilterDataProps) {
	const dataProvider = useContext(DataContext);
	const activeData = dataProvider.selectActiveData();
	const theme = useMantineTheme();

	const [opened, setOpened] = useState(false);
	const [displayData] = displayDataState;
	const dataLength = activeData.length;

	const filterState = useState<FilterOptions<Transaction>>(initialFilterValue);
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
							{dataLength - displayData.length > 0
								? `Filtrando ${displayData.length} de ${dataLength}`
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
				<FilterDataMenu
					data={activeData}
					displayDataState={displayDataState}
					filterState={filterState}
				/>
			</Menu.Dropdown>
		</Menu>
	);
}
