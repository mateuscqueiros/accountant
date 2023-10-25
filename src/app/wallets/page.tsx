'use client';
import { AddWallet, WalletsActions } from '@/components/Wallets';
import dynamic from 'next/dynamic';

const ConfigContentWrapper = dynamic(() =>
	import('@/components/Config/ConfigContent').then((mod) => mod.ConfigContentWrapper)
);

export default function WalletsPage() {
	return (
		<ConfigContentWrapper title={'Editar carteiras'} rightSection={<AddWallet />}>
			<WalletsActions />
		</ConfigContentWrapper>
	);
}
