import { getCategoryStatistics, getTotalValues } from '@/lib/statistics';
import { useColors } from '@/lib/theme';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import { Flex, Group, Paper, RingProgress, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Dispatch, SetStateAction, useContext } from 'react';

interface HomeStatisticsProps {
	dataState: [Transaction[], Dispatch<SetStateAction<Transaction[]>>];
}

export function HomeStatistics({ dataState }: HomeStatisticsProps) {
	const dataProvider = useContext(DataContext);
	const [data] = dataState;
	const categories = dataProvider.values.user.categories;
	const colors = useColors();
	const theme = useMantineTheme();
	const isSmallMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

	let { expenses, recipes } = getTotalValues(data);
	let ringProgressStatistics: any[] = getCategoryStatistics(data, categories);

	return (
		<>
			<Paper mb="md" p="md" px="2rem">
				<Flex
					direction={isSmallMobile ? 'column' : 'row'}
					justify="space-between"
					align={isSmallMobile ? 'center' : 'space-between'}
					wrap="wrap"
					gap="md"
				>
					<Flex direction="column" justify="center" gap={0}>
						<Group gap={0}>
							<Text mr={10}>Saldo mensal:</Text>
							<Text fz="lg" fw={500} c={recipes - expenses > 0 ? colors.recipes : colors.expenses}>
								${(recipes - expenses).toFixed(2)}
							</Text>
						</Group>
						<Group gap={0}>
							<Text mr={10}>Total de gastos:</Text>
							<Text fz="lg" c={colors.expenses} fw={500}>
								${expenses.toFixed(2)}
							</Text>
						</Group>
					</Flex>
					<RingProgress roundCaps thickness={15} sections={ringProgressStatistics} />
				</Flex>
			</Paper>
		</>
	);
}
