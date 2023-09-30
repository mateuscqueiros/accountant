'use client';
import { Categories, Wrapper } from '@/components/Config';
import { nprogress } from '@mantine/nprogress';
import { usePathname, useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { CategoryTabsContext } from './layout';

export default function CategoriesPage() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const categoryCtx = useContext(CategoryTabsContext);

	useEffect(() => {
		categoryCtx.setActive(-1);
	}, []);

	useEffect(() => {
		nprogress.complete();
		return () => {
			nprogress.start();
		};
	}, [pathname, searchParams]);

	return (
		<Wrapper title={'Editar categorias'}>
			<Categories />
		</Wrapper>
	);
}
