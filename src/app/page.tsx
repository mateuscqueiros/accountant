'use client';

import {
	HomeActions,
	HomeContent,
	HomePageFallback,
	HomeStatistics,
} from '@/components/pages/Home';
import { DataContext } from '@/providers/DataProvider';
import { BillsDataItem } from '@/types/Data';
import { Box, rem } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

export default function Home() {
	const data = useContext(DataContext);
	let [activeData, setActiveData] = useState<BillsDataItem[]>([]);

	useEffect(() => {
		setActiveData(data.selectActiveData());
	}, []);

	return (
		<Box maw={rem('1200px')} mx="auto">
			<HomeActions />
			{activeData.length > 0 ? (
				<>
					<HomeStatistics />
					<HomeContent />
				</>
			) : (
				<HomePageFallback />
			)}
		</Box>
	);
}
