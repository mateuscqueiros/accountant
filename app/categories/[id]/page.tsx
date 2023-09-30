'use client';
import { ConfigTabs } from '@/components/Config';
import { nprogress } from '@mantine/nprogress';
import { usePathname, useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { CategoryTabsContext } from '../layout';

export default function CategoryIdPage({ params }: { params: { id: string } }) {
	const categoryCtx = useContext(CategoryTabsContext);
	useEffect(() => {
		categoryCtx.setActive(Number(params.id));
	}, []);

	const pathname = usePathname();
	const searchParams = useSearchParams();
	useEffect(() => {
		nprogress.complete();
		return () => {
			nprogress.start();
		};
	}, [pathname, searchParams]);

	return <ConfigTabs categoryId={Number(params.id)} />;
}
