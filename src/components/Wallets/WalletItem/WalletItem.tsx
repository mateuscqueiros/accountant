import { useColors } from '@/lib/theme';
import { Wallet } from '@/types/data';
import { Card, Group, Stack, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';

interface WalletItem {
	wallet: Wallet;
}

export function WalletItem({ wallet }: WalletItem) {
	const colors = useColors();

	const { hovered, ref } = useHover();

	return (
		<Card
			ref={ref}
			radius="md"
			maw={300}
			miw="100%"
			p="lg"
			style={{ cursor: 'pointer' }}
			bg={hovered ? colors.state.hover : undefined}
			withBorder
		>
			<Group justify="space-between">
				<Text fz="lg" fw="bold">
					{wallet.label}
				</Text>
			</Group>

			<Stack w="100%" mt={20} gap="xs">
				<Group justify="space-between" w="100%">
					<Text c={colors.text.secondary}>Saldo</Text>
					<Text fw="bold" c={colors.recipes}>
						$1300
					</Text>
				</Group>
				<Group justify="space-between" w="100%">
					<Text c={colors.text.secondary}>Gastos</Text>
					<Text fw="bold" c={colors.expenses}>
						$700
					</Text>
				</Group>
			</Stack>
		</Card>
	);
}
