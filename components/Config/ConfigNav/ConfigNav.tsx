import { DataContext } from '@/contexts/DataContext';
import { Container, ScrollArea, Tabs, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import { CategoryTabsContext } from 'app/categories/page';
import { useContext } from 'react';
import navBarClasses from './NavBar.module.css';
import tabClasses from './Tabs.module.css';

export function ConfigNav() {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`);
	const { width } = useViewportSize();
	const data = useContext(DataContext);

	const categoryTab = useContext(CategoryTabsContext);
	const categories = data.values.user.categories;

	const tabLinks = categories.map((category) => (
		<Tabs.Tab
			onClick={() => {
				categoryTab.setActive(category.id);
			}}
			value={category.label}
			key={category.label}
		>
			{category.label}
		</Tabs.Tab>
	));

	const links = [
		{
			id: -1,
			label: 'Todas',
			color: 'blue-6',
		},
		...categories,
	];

	const navLinks = links.map((category) => (
		<div
			style={{
				backgroundColor:
					categoryTab.active === category.id ? `var(--mantine-color-${category.color})` : undefined,
			}}
			className={navBarClasses.link}
			data-active={categoryTab.active === category.id || undefined}
			onClick={() => {
				categoryTab.setActive(category.id);
			}}
			key={category.label}
		>
			{category.label}
		</div>
	));

	return isMobile ? (
		<Container className={tabClasses.container} p={0} w="100%">
			<ScrollArea classNames={tabClasses} maw={width} h={50}>
				<Tabs
					inverted
					defaultValue="Categorias"
					variant="outline"
					hiddenFrom="sm"
					classNames={{
						root: tabClasses.tabs,
						list: tabClasses.tabsList,
						tab: tabClasses.tab,
					}}
				>
					<Tabs.List w={width}>
						{tabLinks.map((item, index) => {
							return item;
						})}
					</Tabs.List>
				</Tabs>
			</ScrollArea>
		</Container>
	) : (
		<nav className={navBarClasses.navbar}>
			<div className={navBarClasses.wrapper}>
				<div className={navBarClasses.main}>
					<Text className={navBarClasses.title}>Categorias</Text>
					{navLinks}
				</div>
			</div>
		</nav>
	);
}
