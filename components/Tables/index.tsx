import { DataContext } from '@/contexts/DataContext';
import { ModalsContext } from '@/contexts/ModalsContext';
import { BillsDataItemType } from '@/shared/types/data.types';
import { ItemForm } from '@/shared/types/forms.types';
import { ActionIcon, Card, Flex, Table, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useContext } from 'react';
import { DefaultItem } from './Default';
import { ItemFixedTable } from './Fixed';
import { ItemInstallmentTable } from './Installment';
import { ItemMonthlyTable } from './Monthly';

export default function DefaultTable({
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
	const modal = useContext(ModalsContext);

	let activeData: BillsDataItemType[] = [];

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
						modal.item.reset();
						if (type) {
							modal.item.setField('type', type);
						}
						if (itemClass) {
							modal.item.setField('class', itemClass);
						}
						modal.item.open();
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
										return <ItemMonthlyTable key={item.id} item={item} />;
									}
									if (type === 'fixed') {
										return <ItemFixedTable key={item.id} item={item} />;
									}
									if (type === 'installment') {
										return <ItemInstallmentTable key={item.id} item={item} />;
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
