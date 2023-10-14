'use client';

import {
	HomeActions,
	HomeContent,
	HomePageFallback,
	HomeStatistics,
} from '@/components/pages/Home';
import { initialOrdernateValue } from '@/consts/actions';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import { Box, rem } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

export default function Home() {
	const data = useContext(DataContext);
	let activeData = data.selectActiveData();

	const displayDataState = useState<Transaction[]>([]);
	const [_, setDisplayData] = displayDataState;

	const ordenationState = useState(initialOrdernateValue);

	useEffect(() => {
		setDisplayData(data.selectActiveData());
	}, [data]);

	return (
		<Box maw={rem('1200px')} mx="auto">
			<HomeActions displayDataState={displayDataState} />
			{activeData.length > 0 ? (
				<>
					<HomeStatistics dataState={displayDataState} />
					<HomeContent dataState={displayDataState} ordenationState={ordenationState} />
				</>
			) : (
				<>
					<HomePageFallback />
				</>
			)}
		</Box>
	);
}
