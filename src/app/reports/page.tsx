'use client';

import { Text, Title } from '@mantine/core';
import { IconTrademark } from '@tabler/icons-react';

export default function ReportsPage() {
	return (
		<>
			<Title mb="lg" order={1}>
				Relatórios
			</Title>
			<Text>
				Em breve <IconTrademark size="1rem" />
			</Text>
		</>
	);
}
