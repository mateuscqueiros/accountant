'use client';

import { WalletsModalProviders } from '@/components/Wallets';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { PropsWithChildren } from 'react';

const WalletsProvider = dynamic(() =>
	import('@/providers/WalletsProvider').then((mod) => mod.WalletsProvider)
);

export default function CategoryLayout({ children }: PropsWithChildren) {
	const params = useParams();

	const walletSlug = params.id !== undefined ? String(params.id) : null;

	return (
		<WalletsModalProviders>
			<WalletsProvider walletSlug={walletSlug}>{children}</WalletsProvider>
		</WalletsModalProviders>
	);
}
