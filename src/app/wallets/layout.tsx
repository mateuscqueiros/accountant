'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { PropsWithChildren } from 'react';

const WalletsProvider = dynamic(() =>
	import('@/providers/WalletsProvider').then((mod) => mod.WalletsProvider)
);

export default function CategoryLayout({ children }: PropsWithChildren) {
	const params = useParams();

	const walletId = params.id !== undefined ? Number(params.id) : null;

	return <WalletsProvider walletId={walletId}>{children}</WalletsProvider>;
}
