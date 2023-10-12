'use client';
import { ConfigTabs } from '@/components/Config';
import { CategoryTabsContext } from '@/providers/CategoriesProvider';
import { useContext, useEffect } from 'react';

export default function CategoryIdPage({ params }: { params: { id: string } }) {
	const categoryCtx = useContext(CategoryTabsContext);
	useEffect(() => {
		categoryCtx.setActive(Number(params.id));
	}, []);

	return <ConfigTabs categoryId={Number(params.id)} />;
}
