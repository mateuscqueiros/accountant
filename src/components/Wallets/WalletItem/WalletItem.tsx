import { getTotalValues } from '@/lib/statistics';
import { useColors } from '@/lib/theme';
import { DataContext } from '@/providers/DataProvider';
import { Wallet } from '@/types/data';
import { Box, Card, Group, Indicator, Stack, Text, Tooltip } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useContext } from 'react';

interface WalletItem {
	wallet: Wallet;
}

export function WalletItem({ wallet }: WalletItem) {
	const data = useContext(DataContext);
	const colors = useColors();

	const walletItems = data.values.items.filter((item) => {
		return item.walletId === wallet.id;
	});

	const walletTotals = getTotalValues(walletItems);

	const { hovered, ref } = useHover();

	return (
		<Card
			radius="md"
			maw={300}
			miw="100%"
			p="lg"
			style={{ cursor: 'pointer' }}
			bg={hovered ? colors.state.hover : undefined}
			withBorder
		>
			<Box ref={ref}>
				<Group justify="space-between" align="flex-start">
					<Text fz="lg" fw="bold">
						{wallet.label}
					</Text>
					{wallet.default === true && (
						<Tooltip
							multiline
							maw={300}
							label="Essa é a carteira padrão. Quando outras carteiras são deletadas seus itens são transferidos para cá."
						>
							<Indicator />
						</Tooltip>
					)}
				</Group>

				{walletItems && walletItems.length > 0 ? (
					<Stack w="100%" mt={20} gap="xs">
						<Group justify="space-between" w="100%">
							<Text c={colors.text.secondary}>Saldo</Text>
							<Text fw="bold" c={walletTotals.total > 0 ? colors.recipes : colors.expenses}>
								${walletTotals.total.toFixed(2)}
							</Text>
						</Group>
						<Group justify="space-between" w="100%">
							<Text c={colors.text.secondary}>Gastos</Text>
							<Text fw="bold" c={colors.expenses}>
								${walletTotals.expenses.toFixed(2)}
							</Text>
						</Group>
					</Stack>
				) : (
					<Text>Esta carteira não possui itens</Text>
				)}
			</Box>
		</Card>
	);
}
