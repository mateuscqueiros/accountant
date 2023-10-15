'use client';

import { CategoriesProvider } from '@/providers/CategoriesProvider';
import { useParams } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function CategoryLayout({ children }: PropsWithChildren) {
	const params = useParams();

	const categoryId = params.id !== undefined ? Number(params.id) : null;

	return <CategoriesProvider categoryId={categoryId}>{children}</CategoriesProvider>;
}
