'use client';
import { initialFilterValue } from '@/consts/actions';
import { FilterOptions } from '@/lib/utils';
import { getWalletBySlug } from '@/lib/wallets';
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

const FilterData = dynamic(() => import('@/components/FilterData').then((mod) => mod.FilterData));

export default function WalletIdPage() {
	const params = useParams();
	const activeSlug = useMemo(() => String(params.id), [params]);
	const data = useContext(DataContext);
	const wallets = data.values.user.wallets;

	const activeWallet = getWalletBySlug(activeSlug, wallets);

	const allWalletItemData = data.values.items.filter((item) => item.walletId === activeWallet.id);
	const walletItemDisplayDataState = useState(allWalletItemData);
	const initialFilterState = {
		...initialFilterValue,
		walletId: undefined,
	};
	const filterState = useState<FilterOptions<Transaction>>(initialFilterState);

	const [_, setWalletItems] = walletItemDisplayDataState;

	useEffect(() => {
		setWalletItems(data.values.items.filter((item) => item.walletId === activeWallet.id));
	}, [data.values.items, activeSlug]);

	return (
		<ConfigContentWrapper
			rightSection={
				<FilterData
					data={allWalletItemData}
					displayDataState={walletItemDisplayDataState}
					filterState={filterState}
					initialFilterState={initialFilterState}
				/>
			}
			title={activeWallet ? activeWallet.label : ''}
		>
			<WalletsTabContent displayData={walletItemDisplayDataState} walletSlug={activeSlug} />
		</ConfigContentWrapper>
	);
}
