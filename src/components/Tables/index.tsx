import { selectActiveDataItems } from '@/store/features/data/dataSlice';
import { openModal, resetModal, setType } from '@/store/features/modalItemForm/itemFormModalSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ActionIcon, Card, Flex, Table, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { ItemFixedTable } from './ItemFixedTable';
import { ItemInstallmentTable } from './ItemInstallmentTable';
import { ItemMonthlyTable } from './ItemMonthlyTable';

export default function DefaultTable({ header, title, type }: any) {
	const activeData = useAppSelector(selectActiveDataItems).filter(
		(billItem) => billItem.type === type
	);

	const dispatch = useAppDispatch();

	return (
		<Card h="fit-content">
			<Flex justify="space-between" mb="xs">
				<Text fw={600} fz="xl">
					{title}
				</Text>
				<ActionIcon
					variant="default"
					onClick={() => {
						dispatch(resetModal());
						dispatch(setType(type));
						dispatch(openModal());
					}}
				>
					<IconPlus size="0.9rem" />
				</ActionIcon>
			</Flex>
			{activeData && activeData.length > 0 ? (
				<>
					<Table withColumnBorders striped highlightOnHover>
						<thead>
							<tr>
								{header.map((headerItem: string) => {
									return <th key={headerItem}>{headerItem}</th>;
								})}
							</tr>
						</thead>
						<tbody>
							{activeData.map((item) => {
								if (type === 'fixed') {
									return <ItemFixedTable key={item.id} item={item} />;
								} else if (type === 'installment') {
									return <ItemInstallmentTable key={item.id} item={item} />;
								} else if (type === 'monthly') {
									return <ItemMonthlyTable key={item.id} item={item} />;
								}
							})}
						</tbody>
						<tfoot>
							<tr>
								{header.map((_: string, index: number) => {
									if (index === 0) {
										return (
											<th style={{ fontSize: '1.1rem' }} key={index}>
												Total
											</th>
										);
									} else if (index === 1) {
										return (
											<th style={{ fontSize: '1.1rem' }} key={index}>
												{activeData
													.filter((item) => item.active === true)
													.reduce((partialSum, a) => partialSum + a.value, 0)}
											</th>
										);
									} else {
										return <th key={index}></th>;
									}
								})}
							</tr>
						</tfoot>
					</Table>
				</>
			) : (
				'Sem contas'
			)}
		</Card>
	);
}
