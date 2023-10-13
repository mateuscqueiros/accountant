'use client';

import { OrdersOptions } from '@/components/Transactions';
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
	let activeData = data.selectActiveData();

	const displayData = useState<BillsDataItem[]>(activeData);

	const orders = useState<OrdersOptions>({
		label: 1,
		categoryId: 0,
		date: 0,
		type: 0,
		value: 0,
	});

	useEffect(() => {
		const [_, setDisplayData] = displayData;
		setDisplayData(data.selectActiveData());
	}, [activeData]);

	return (
		<Box maw={rem('1200px')} mx="auto">
			<HomeActions dataState={displayData} />
			{activeData.length > 0 ? (
				<>
					<HomeStatistics dataState={displayData} />
					<HomeContent dataState={displayData} orders={orders} />
				</>
			) : (
				<HomePageFallback />
			)}
		</Box>
	);
}
