'use client';

import { nprogress } from '@mantine/nprogress';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	useEffect(() => {
		nprogress.complete();
		return () => {
			nprogress.start();
		};
	}, [pathname, searchParams]);

	return <div>Relatórios (em breve)</div>;
}
