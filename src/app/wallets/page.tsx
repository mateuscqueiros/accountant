'use client';
import { WalletItem } from '@/components/Wallets';
import { DataContext } from '@/providers/DataProvider';
import { SimpleGrid } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useContext } from 'react';

const ConfigContentWrapper = dynamic(() =>
	import('@/components/Config').then((mod) => mod.ConfigContentWrapper)
);

export default function WalletsPage() {
	const data = useContext(DataContext);
	const wallets = data.values.user.wallets;

	return (
		<ConfigContentWrapper title={'Editar carteiras'}>
			<SimpleGrid w="100%" cols={{ base: 1, md: 2, lg: 3 }}>
				{wallets.map((wallet) => (
					<WalletItem key={wallet.label + wallet.id} wallet={wallet} />
				))}
			</SimpleGrid>
		</ConfigContentWrapper>
	);
}
