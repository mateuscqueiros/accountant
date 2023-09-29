import { DataContext } from '@/contexts/DataContext/DataContext';
import { ModalsContext } from '@/contexts/ModalsContext/ModalsContext';
import { ActionIcon, Card, Flex, Table, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useContext } from 'react';
import { BillsDataItem } from 'src/types/Data/data.types';
import { ItemForm } from 'src/types/Forms/forms.types';
import { DefaultItem } from './DefaultItem/DefaultItem';
import { FixedItem } from './FixedItem/FixedItem';
import { InstallmentItem } from './InstallmentItem/InstallmentItem';
import { MonthlyItem } from './MonthlyItem/MonthlyItem';

export function DefaultTable({
	header,
	title,
	type,
	itemClass,
}: {
	header: string[];
	title: string;
	type?: ItemForm['type'];
	itemClass: ItemForm['class'];
}) {
	const data = useContext(DataContext);
	const modals = useContext(ModalsContext);

	let activeData: BillsDataItem[] = [];

	activeData = data.selectActiveData().filter((billItem) => {
		return (
			(type !== undefined ? billItem.type === type : true) &&
			(itemClass !== undefined ? itemClass && billItem.class === itemClass : true)
		);
	});

	return (
		<Card h="fit-content" withBorder>
			<Flex justify="space-between" mb="xs">
				<Text fw={600} fz="xl">
					{title}
				</Text>
				<ActionIcon
					variant="default"
					onClick={() => {
						modals.item.reset();
						if (type) {
							modals.item.setField('type', type);
						}
						if (itemClass) {
							modals.item.setField('class', itemClass);
						}
						modals.item.open();
					}}
				>
					<IconPlus size="0.9rem" />
				</ActionIcon>
			</Flex>
			{activeData && activeData.length > 0 ? (
				<>
					<Table striped highlightOnHover withRowBorders withColumnBorders>
						<Table.Thead>
							<Table.Tr>
								{header.map((headerItem: string) => {
									return <Table.Td key={headerItem}>{headerItem}</Table.Td>;
								})}
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{activeData.map((item) => {
								if (item.class === 'expense') {
									if (type === 'monthly') {
										return <MonthlyItem key={item.id} item={item} />;
									}
									if (type === 'fixed') {
										return <FixedItem key={item.id} item={item} />;
									}
									if (type === 'installment') {
										return <InstallmentItem key={item.id} item={item} />;
									}
								} else {
									return <DefaultItem key={item.id} item={item} />;
								}
							})}
							<Table.Tr style={{ fontSize: '1rem', fontWeight: 'bold' }}>
								{header.map((_: string, index: number) => {
									if (index === 0) {
										return <Table.Td key={index}>Total</Table.Td>;
									} else if (index === 1) {
										return (
											<Table.Td key={index}>
												{activeData
													.filter((item) => item.active === true)
													.reduce((partialSum, a) => partialSum + a.value, 0)}
											</Table.Td>
										);
									} else {
										return <Table.Td key={index}></Table.Td>;
									}
								})}
							</Table.Tr>
						</Table.Tbody>
					</Table>
				</>
			) : (
				'Sem contas'
			)}
		</Card>
	);
}
