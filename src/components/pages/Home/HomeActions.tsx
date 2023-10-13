import { FilterData } from '@/components/FilterData';
import { ItemFormAddButton } from '@/components/ItemForm';
import { TransferDataModal } from '@/components/TransferDataModal';
import { compareStartOfMonth } from '@/lib/dates';
import { capitalizeFirstLetter } from '@/lib/utils';
import { DataContext } from '@/providers/DataProvider';
import { BillsDataItem } from '@/types/Data';
import { Box, Flex, Group, Modal, Title } from '@mantine/core';
import { MonthPicker } from '@mantine/dates';
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react';
import { format, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

interface HomeActionsProps {
	dataState: [BillsDataItem[], Dispatch<SetStateAction<BillsDataItem[]>>];
}

export function HomeActions({ dataState }: HomeActionsProps) {
	const dataProvider = useContext(DataContext);
	const [data] = dataState;
	const activeMonthDisplay = format(new Date(dataProvider.values.activeMonth), "MMMM' de 'yyyy", {
		locale: ptBR,
	});

	const [monthPickerStateSelect, setMonthPickerStateSelect] = useState(false);

	return (
		<>
			<Flex justify="space-between" align="center" mb="md" wrap="wrap" gap="md">
				<Group
					w="fit-content"
					style={{ cursor: 'pointer' }}
					onClick={() => {
						setMonthPickerStateSelect(!monthPickerStateSelect);
					}}
				>
					<Title order={1}>{capitalizeFirstLetter(activeMonthDisplay)}</Title>
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
				{data !== undefined && (
					<Group>
						<FilterData />
						<TransferDataModal />
						<ItemFormAddButton />
					</Group>
				)}
			</Flex>
		</>
	);
}
