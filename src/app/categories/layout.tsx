'use client';

import { CategoriesModalProvider } from '@/components/Categories';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { PropsWithChildren } from 'react';

const CategoriesProvider = dynamic(() =>
	import('@/providers/CategoriesProvider').then((mod) => mod.CategoriesProvider)
);

export default function CategoryLayout({ children }: PropsWithChildren) {
	const params = useParams();

	const categorySlug = params.id !== undefined ? String(params.id) : null;

	return (
		<CategoriesModalProvider>
			<CategoriesProvider categorySlug={categorySlug}>{children}</CategoriesProvider>
		</CategoriesModalProvider>
	);
}
