import { FilterData } from '@/components/FilterData';
import { AddItem } from '@/components/ItemsForm';
import { TransferDataModal } from '@/components/TransferDataModal';
import { initialFilterValue } from '@/consts/actions';
import { compareStartOfMonth } from '@/lib/dates';
import { FilterOptions, capitalizeFirstLetter } from '@/lib/utils';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import { Box, Flex, Group, Modal, Title, rem, useMantineTheme } from '@mantine/core';
import { MonthPicker } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react';
import { format, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

interface HomeActionsProps {
	displayDataState: [Transaction[], Dispatch<SetStateAction<Transaction[]>>];
	data: Transaction[];
}

export function HomeActions({ data, displayDataState }: HomeActionsProps) {
	const dataProvider = useContext(DataContext);
	const [displayData] = displayDataState;
	const activeMonthDisplay = format(new Date(dataProvider.values.activeMonth), "MMMM' de 'yyyy", {
		locale: ptBR,
	});

	const theme = useMantineTheme();
	const isExtraSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

	const [monthPickerStateSelect, setMonthPickerStateSelect] = useState(false);

	const initialFilterState = initialFilterValue;
	const filterState = useState<FilterOptions<Transaction>>(initialFilterValue);

	return (
		<>
			<Flex justify="space-between" align="center" mb="md" wrap="wrap" gap="md">
				<Group
					w={isExtraSmallScreen ? '100%' : 'fit-content'}
					style={{ cursor: 'pointer' }}
					onClick={() => {
						setMonthPickerStateSelect(!monthPickerStateSelect);
					}}
					wrap="nowrap"
					justify="space-between"
				>
					<Title order={1} fz={isExtraSmallScreen ? rem(32) : undefined}>
						{capitalizeFirstLetter(activeMonthDisplay)}
					</Title>
					{monthPickerStateSelect ? <IconCaretUpFilled /> : <IconCaretDownFilled />}
				</Group>
				<Modal
					size="sm"
					title="Escolha um mês"
					opened={monthPickerStateSelect}
					onClose={() => setMonthPickerStateSelect(false)}
				>
					<Box w="fit-content" m="0 auto">
						<MonthPicker
							placeholder="01/01/2023"
							value={startOfMonth(new Date(dataProvider.values.activeMonth))}
							locale="ptBR"
							getYearControlProps={(date) => {
								if (date.getFullYear() === new Date().getFullYear()) {
									return {
										style: () => ({
											fontWeight: 700,
										}),
									};
								}

								return {};
							}}
							getMonthControlProps={(date) => {
								if (
									date.getMonth() === new Date().getMonth() &&
									date.getFullYear() === new Date().getFullYear()
								) {
									return {
										style: () => ({
											fontWeight: 700,
										}),
									};
								}

								if (
									dataProvider.values.items.every(
										(billItem) => !compareStartOfMonth(billItem.date, date)
									)
								) {
									return {
										style: () => ({
											opacity: 0.5,
										}),
									};
								}

								return {};
							}}
							onChange={(e) => {
								const parseMonth = new Date(e ? e.toString() : new Date()).toDateString();
								dataProvider.setActiveMonth(parseMonth);
								setMonthPickerStateSelect(false);
							}}
						/>
					</Box>
				</Modal>
				{displayData !== undefined && (
					<Group>
						<FilterData
							initialFilterState={initialFilterState}
							data={data}
							filterState={filterState}
							displayDataState={displayDataState}
						/>
						<TransferDataModal />
						<AddItem />
					</Group>
				)}
			</Flex>
		</>
	);
}
