'use client';
import { getWalletById } from '@/lib/wallets';
import { DataContext } from '@/providers/DataProvider';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useContext } from 'react';

const ConfigContentWrapper = dynamic(() =>
	import('@/components/Config').then((mod) => mod.ConfigContentWrapper)
);

export default function WalletIdPage() {
	const params = useParams();
	const activeId = Number(params.id);
	const wallets = useContext(DataContext).values.user.wallets;

	const activeWallet = getWalletById(activeId, wallets);

	return (
		<ConfigContentWrapper title={activeWallet ? activeWallet.label : ''}>
			{activeId}
		</ConfigContentWrapper>
	);
}
