import { CategoryTabsContext } from '@/providers/CategoriesProvider';
import { DataContext } from '@/providers/DataProvider';
import { getCategoryById, sortCategories } from '@/utils/categories';
import { Container, ScrollArea, Tabs, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import Link from 'next/link';
import { useContext } from 'react';
import navBarClasses from './NavBar.module.css';
import tabClasses from './Tabs.module.css';

export function ConfigNav() {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`);
	const { width } = useViewportSize();
	const data = useContext(DataContext);

	const categoryTab = useContext(CategoryTabsContext);
	const categories = sortCategories(data.values.user.categories);

	const tabLinks = categories.map((category) => (
		<Link key={category.id} className={tabClasses.link} href={`/categories/${category.id}`}>
			<Tabs.Tab value={category.label} key={category.label}>
				{category.label}
			</Tabs.Tab>
		</Link>
	));

	const navLinks = categories.map((category) => (
		<Link
			className={navBarClasses.link_wrapper}
			key={category.id}
			href={`/categories/${String(category.id)}`}
			data-testid={`category-${category.id}`}
		>
			<div
				style={{
					backgroundColor:
						categoryTab.active === category.id
							? `var(--mantine-color-${category.color})`
							: undefined,
				}}
				className={navBarClasses.link}
				data-active={categoryTab.active === category.id || undefined}
			>
				{category.label}
			</div>
		</Link>
	));

	const activeCategory = getCategoryById(data.values.user.categories, categoryTab.active);

	return isMobile ? (
		<Container className={tabClasses.container} p={0} w="100%">
			<Tabs
				inverted
				defaultValue="Todas"
				variant="outline"
				hiddenFrom="sm"
				value={(activeCategory && activeCategory.label) || 'Todas'}
				classNames={{
					root: tabClasses.tabs,
					list: tabClasses.tabsList,
					tab: tabClasses.tab,
				}}
			>
				<ScrollArea offsetScrollbars="x">
					<Tabs.List w={width}>
						<Link className={tabClasses.link} href={`/categories`}>
							<Tabs.Tab value="Todas">Todas</Tabs.Tab>
						</Link>
						{tabLinks.map((item, index) => {
							return item;
						})}
					</Tabs.List>
				</ScrollArea>
			</Tabs>
		</Container>
	) : (
		<nav className={navBarClasses.navbar}>
			<div className={navBarClasses.wrapper}>
				<div className={navBarClasses.main}>
					<Text className={navBarClasses.title}>Categorias</Text>
					<Link className={navBarClasses.link_wrapper} href={`/categories`}>
						<div
							style={{
								backgroundColor:
									categoryTab.active === -1 ? `var(--mantine-color-blue-6)` : undefined,
							}}
							className={navBarClasses.link}
							data-active={categoryTab.active === -1 || undefined}
						>
							Todos
						</div>
					</Link>
					{navLinks}
				</div>
			</div>
		</nav>
	);
}