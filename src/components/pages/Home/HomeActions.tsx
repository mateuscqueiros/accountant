import { ItemFormAddButton } from '@/components/ItemForm';
import { TransferDataModal } from '@/components/TransferDataModal';
import { compareStartOfMonth } from '@/lib/dates';
import { capitalizeFirstLetter } from '@/lib/utils';
import { DataContext } from '@/providers/DataProvider';
import { Box, Flex, Group, Modal, Title } from '@mantine/core';
import { MonthPicker } from '@mantine/dates';
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react';
import { format, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useContext, useState } from 'react';

export function HomeActions() {
	const data = useContext(DataContext);
	const activeData = data.selectActiveData();
	const activeMonthDisplay = format(new Date(data.values.activeMonth), "MMMM' de 'yyyy", {
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
							value={startOfMonth(new Date(data.values.activeMonth))}
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
									data.values.items.every(
										(billItem) => !compareStartOfMonth(billItem.date, date.toString())
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
								data.setActiveMonth(parseMonth);
								setMonthPickerStateSelect(false);
							}}
						/>
					</Box>
				</Modal>
				{activeData && (
					<Group>
						<TransferDataModal />
						<ItemFormAddButton />
					</Group>
				)}
			</Flex>
		</>
	);
}
