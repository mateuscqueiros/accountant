import { initialFilterValue } from '@/consts/actions';
import { FilterOptions, someKeyIsNotEmpty } from '@/lib/utils';
import { DataContext } from '@/providers/DataProvider';
import { BillsDataItem } from '@/types/Data';
import { Anchor, Flex, Menu, Text } from '@mantine/core';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { ActionIcon, IconFilter, IconFilterFilled } from '../Icons';
import { FilterDataMenu } from './FilterDataMenu';

interface FilterDataProps {
	displayDataState: [BillsDataItem[], Dispatch<SetStateAction<BillsDataItem[]>>];
}

export function FilterData({ displayDataState }: FilterDataProps) {
	const dataProvider = useContext(DataContext);
	const activeData = dataProvider.selectActiveData();

	const [opened, setOpened] = useState(false);
	const [displayData] = displayDataState;
	const dataLength = activeData.length;

	const filterState = useState<FilterOptions<BillsDataItem>>(initialFilterValue);
	const [filter, setFilters] = filterState;

	return (
		<Menu
			shadow="md"
			width={200}
			closeOnItemClick={false}
			opened={opened}
			onChange={setOpened}
			position="bottom-end"
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
