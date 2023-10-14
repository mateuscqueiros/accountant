import { CategoriesProvider } from '@/providers/CategoriesProvider';
import { PropsWithChildren } from 'react';

export default function CategoryLayout({ children }: PropsWithChildren) {
	return <CategoriesProvider>{children}</CategoriesProvider>;
}
