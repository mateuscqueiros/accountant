'use client';

import { initialOrdernateValue } from '@/consts/actions';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import { Box, rem } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';

const HomeActions = dynamic(() => import('@/components/pages/Home').then((mod) => mod.HomeActions));
const HomeStatistics = dynamic(() =>
	import('@/components/pages/Home').then((mod) => mod.HomeStatistics)
);
const HomeContent = dynamic(() => import('@/components/pages/Home').then((mod) => mod.HomeContent));
const HomePageFallback = dynamic(() =>
	import('@/components/pages/Home').then((mod) => mod.HomePageFallback)
);

export default function Home() {
	const data = useContext(DataContext);
	const displayDataState = useState<Transaction[]>([]);
	const [_, setDisplayData] = displayDataState;

	const ordenationState = useState(initialOrdernateValue);

	useEffect(() => {
		const activeData = data.selectActiveData();
		setDisplayData(activeData);
	}, [data]);

	return (
		<>
			<Box mx="auto" maw={rem('1200px')}>
				<HomeActions displayDataState={displayDataState} />
				{displayDataState.length > 0 ? (
					<>
						<HomeStatistics dataState={displayDataState} />
						<HomeContent dataState={displayDataState} ordenationState={ordenationState} />
					</>
				) : (
					<>
						<></>
						<HomePageFallback />
					</>
				)}
			</Box>
		</>
	);
}
