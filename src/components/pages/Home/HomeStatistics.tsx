import { getCategoriesValues, getCategory } from '@/lib/categories';
import { colors } from '@/lib/colors';
import { getPercentageArray } from '@/lib/utils';
import { DataContext } from '@/providers/DataProvider';
import { Flex, Group, Paper, RingProgress, Text } from '@mantine/core';
import { useContext, useState } from 'react';

export function HomeStatistics() {
	const data = useContext(DataContext);
	const activeData = data.selectActiveData();

	let expensesTotal = 0;
	let incomeTotal = 0;
	let ringProgressStatistics: any[] = [];

	const [displayData, setDisplayData] = useState(activeData);

	if (activeData.length > 0) {
		expensesTotal = activeData
			.filter((item) => item.active && !(item.class === 'recipe'))
			.reduce((partialSum, a) => partialSum + a.value, 0);

		incomeTotal = activeData
			.filter((item) => item.active && item.class === 'recipe')
			.reduce((partialSum, a) => partialSum + a.value, 0);

		let categoriesValues = getCategoriesValues(activeData, data.values.user.categories);
		let categoriesValuesToPercentage = getPercentageArray(
			categoriesValues.map((item) => item.value)
		);
		ringProgressStatistics = categoriesValuesToPercentage.map((item, index) => {
			return {
				value: item,
				tooltip: `${categoriesValues[index].label} (${categoriesValuesToPercentage[index]}%)`,
				color: getCategory(data.values.user.categories, categoriesValues[index].id).color,
			};
		});
	}

	return (
		<>
			<Paper mb="md" p="md" px="2rem">
				<Flex justify="space-between" wrap="wrap" gap="md">
					<Flex direction="column" justify="center" gap={0}>
						<Group gap={0}>
							<Text mr={10}>Saldo mensal:</Text>
							<Text
								fz="lg"
								fw={600}
								c={incomeTotal - expensesTotal > 0 ? colors.recipes : colors.expenses}
							>
								${(incomeTotal - expensesTotal).toFixed(2)}
							</Text>
						</Group>
						<Group style={{ gap: 0 }}>
							<Text mr={10}>Total de gastos:</Text>
							<Text fz="lg" c={colors.expenses} fw={600}>
								${expensesTotal.toFixed(2)}
							</Text>
						</Group>
					</Flex>
					<Flex>
						<RingProgress
							roundCaps
							thickness={15}
							sections={
								ringProgressStatistics || [
									{
										value: 100,
										color: 'gray',
										tooltip: 'Sem contas',
									},
								]
							}
						/>
					</Flex>
				</Flex>
			</Paper>
		</>
	);
}
