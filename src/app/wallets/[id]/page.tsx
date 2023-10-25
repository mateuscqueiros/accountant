'use client';
import { FilterData } from '@/components/FilterData';
import { initialFilterValue } from '@/consts/actions';
import { FilterOptions } from '@/lib/utils';
import { getWalletById } from '@/lib/wallets';
import { DataContext } from '@/providers/DataProvider';
import { Transaction } from '@/types/data';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';

const ConfigContentWrapper = dynamic(() =>
	import('@/components/Config/ConfigContent').then((mod) => mod.ConfigContentWrapper)
);

const WalletsTabContent = dynamic(() =>
	import('@/components/Wallets/WalletTabContent').then((mod) => mod.WalletsTabContent)
);

export default function WalletIdPage() {
	const params = useParams();
	const activeId = useMemo(() => Number(params.id), [params]);
	const data = useContext(DataContext);
	const wallets = data.values.user.wallets;

	const activeWallet = getWalletById(activeId, wallets);

	const allWalletItemData = data.values.items.filter((item) => item.walletId === activeId);

	const walletItemDisplayDataState = useState(
		data.values.items.filter((item) => item.walletId === activeId)
	);

	const [_, setWalletItems] = walletItemDisplayDataState;

	useEffect(() => {
		setWalletItems(data.values.items.filter((item) => item.walletId === activeId));
	}, [data.values.items, activeId]);

	const filterState = useState<FilterOptions<Transaction>>(initialFilterValue);

	return (
		<ConfigContentWrapper
			rightSection={
				<FilterData
					data={allWalletItemData}
					displayDataState={walletItemDisplayDataState}
					filterState={filterState}
				/>
			}
			title={activeWallet ? activeWallet.label : ''}
		>
			<WalletsTabContent displayData={walletItemDisplayDataState} walletId={activeId} />
		</ConfigContentWrapper>
	);
}
