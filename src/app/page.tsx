'use client';

import {
	HomeActions,
	HomePageContent,
	HomePageFallback,
	HomeStatistics,
} from '@/components/pages/Home';
import { DataContext } from '@/providers/DataProvider';
import { Box, rem } from '@mantine/core';
import { useContext } from 'react';

export default function Home() {
	const data = useContext(DataContext);
	const activeData = data.selectActiveData();

	return (
		<Box maw={rem('1200px')} mx="auto">
			<HomeActions />
			{activeData.length > 0 ? (
				<>
					<HomeStatistics />
					<HomePageContent />
				</>
			) : (
				<HomePageFallback />
			)}
		</Box>
	);
}
