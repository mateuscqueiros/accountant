'use client';

import { Text, Title } from '@mantine/core';
import { IconTrademark } from '@tabler/icons-react';

export default function SettingsPage() {
	return (
		<>
			<Title mb="lg" order={1}>
				Configurações
			</Title>
			<Text>
				Em breve <IconTrademark size="1rem" />
			</Text>
		</>
	);
}
