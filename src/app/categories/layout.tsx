import { CategoriesProvider } from '@/providers/CategoriesProvider';

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
	return <CategoriesProvider>{children}</CategoriesProvider>;
}
