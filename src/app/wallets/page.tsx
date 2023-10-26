'use client';
import dynamic from 'next/dynamic';

const ConfigContentWrapper = dynamic(() =>
	import('@/components/Config/ConfigContent').then((mod) => mod.ConfigContentWrapper)
);

const AddWallet = dynamic(() => import('@/components/Wallets').then((mod) => mod.AddWallet));

const WalletsActions = dynamic(() =>
	import('@/components/Wallets').then((mod) => mod.WalletsActions)
);

export default function WalletsPage() {
	return (
		<ConfigContentWrapper title={'Editar carteiras'} rightSection={<AddWallet />}>
			<WalletsActions />
		</ConfigContentWrapper>
	);
}
