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

	const categoryId = params.id !== undefined ? Number(params.id) : null;

	return (
		<CategoriesModalProvider>
			<CategoriesProvider categoryId={categoryId}>{children}</CategoriesProvider>
		</CategoriesModalProvider>
	);
}
