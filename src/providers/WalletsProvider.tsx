'use client';

import { ConfigNav } from '@/components/Config/ConfigNav';
import { sortWallets } from '@/lib/wallets';
import { Flex, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PropsWithChildren, useContext } from 'react';
import { DataContext } from './DataProvider';

interface WalletsProvidersProps {
	walletId: number | null;
}

export const WalletsProvider = ({
	children,
	walletId,
}: PropsWithChildren<WalletsProvidersProps>) => {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`);

	const data = useContext(DataContext);
	const wallets = data.values.user.wallets;
	const sortedWallets = sortWallets(wallets);

	const navItems = sortedWallets.map((wallet) => ({
		id: wallet.id,
		label: wallet.label,
		color: theme.primaryColor,
	}));

	return (
		<Flex direction={isMobile ? 'column' : 'row'}>
			<ConfigNav title="Carteiras" route="/wallets" items={navItems} activeId={walletId} />
			{children}
		</Flex>
	);
};
