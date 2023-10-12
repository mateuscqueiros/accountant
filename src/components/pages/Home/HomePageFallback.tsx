import { DataContext } from '@/providers/DataProvider';
import { ModalsContext } from '@/providers/ModalsProvider';
import { Box, Button, Divider, Group, Modal, Stack, Text } from '@mantine/core';
import { MonthPicker } from '@mantine/dates';
import { startOfMonth } from 'date-fns';
import { useContext, useState } from 'react';

export function HomePageFallback() {
	const data = useContext(DataContext);
	const modals = useContext(ModalsContext);

	const [monthPickerStateImport, setMonthPickerStateImport] = useState(false);

	return (
		<>
			<Stack>
				<Divider />
				<Text>Sem dados para esse mês.</Text>
				<Group>
					{data.values.items.length > 0 && (
						<Button
							onClick={() => {
								modals.transferData.open();
							}}
						>
							Importar
						</Button>
					)}
				</Group>
				<Modal
					aria-label="Escolher mês dos dados"
					size="sm"
					title="Escolha um mês para importar"
					opened={monthPickerStateImport}
					onClose={() => setMonthPickerStateImport(false)}
				>
					<Box w="fit-content" m="0 auto">
						<MonthPicker
							placeholder="01/01/2023"
							defaultValue={startOfMonth(new Date())}
							getMonthControlProps={(date) => {
								const obj = { disabled: false };

								// Se não houver dados para certo mês
								const someBillData = data.values.items.some(
									(billItem) =>
										date.getMonth() === new Date(billItem.date).getMonth() &&
										date.getFullYear() === new Date(billItem.date).getFullYear() &&
										data.values.items &&
										data.values.items.length > 0
								);
								if (!someBillData) {
									obj.disabled = true;
								}

								return obj;
							}}
							onChange={() => {
								setMonthPickerStateImport(false);
							}}
						/>
					</Box>
				</Modal>
			</Stack>
		</>
	);
}
