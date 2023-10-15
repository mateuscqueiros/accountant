import { Box, Container, ScrollArea, Tabs, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import Link from 'next/link';
import navBarClasses from './NavBar.module.css';
import tabClasses from './Tabs.module.css';

interface NavItem {
	id: number;
	label: string;
	color: string;
}

function AllNavItem({ isMobile, activeId }: { isMobile: boolean; activeId: number | null }) {
	const mobile = (
		<Link className={tabClasses.link} href={`/categories`}>
			<Tabs.Tab value={String(null)}>Todas</Tabs.Tab>
		</Link>
	);

	const desktop = (
		<Link className={navBarClasses.link_wrapper} href={`/categories`}>
			<div
				style={{
					backgroundColor: activeId === null ? `var(--mantine-color-blue-6)` : undefined,
				}}
				className={navBarClasses.link}
				data-active={activeId === null}
			>
				Todas
			</div>
		</Link>
	);

	return isMobile ? mobile : desktop;
}

function TabItem({
	isMobile,
	item,
	activeId,
}: {
	isMobile: boolean;
	item: NavItem;
	activeId: number | null;
}) {
	const mobile = (
		<Link key={item.id} className={tabClasses.link} href={`/categories/${item.id}`}>
			<Tabs.Tab value={String(item.id)} key={item.label}>
				{item.label}
			</Tabs.Tab>
		</Link>
	);

	const desktop = (
		<Link
			className={navBarClasses.link_wrapper}
			key={item.id}
			href={`/categories/${String(item.id)}`}
		>
			<Box
				bg={activeId === item.id ? item.color : undefined}
				className={navBarClasses.link}
				data-active={activeId === item.id}
			>
				{item.label}
			</Box>
		</Link>
	);

	return isMobile ? mobile : desktop;
}

export function ConfigNav({ items, activeId }: { items: NavItem[]; activeId: number | null }) {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`);
	const { width } = useViewportSize();

	return isMobile ? (
		<Container className={tabClasses.container} p={0} w="100%">
			<Tabs
				inverted
				defaultValue="Todas"
				variant="outline"
				hiddenFrom="sm"
				value={String(activeId)}
				classNames={{
					root: tabClasses.tabs,
					list: tabClasses.tabsList,
					tab: tabClasses.tab,
				}}
			>
				<ScrollArea offsetScrollbars="x">
					<Tabs.List w={width}>
						{<AllNavItem isMobile={true} activeId={activeId} />}
						{items.map((item, index) => (
							<TabItem key={item.label + index} isMobile={true} item={item} activeId={activeId} />
						))}
					</Tabs.List>
				</ScrollArea>
			</Tabs>
		</Container>
	) : (
		<nav className={navBarClasses.navbar}>
			<div className={navBarClasses.wrapper}>
				<div className={navBarClasses.main}>
					<Text className={navBarClasses.title}>Categorias</Text>
					{<AllNavItem isMobile={false} activeId={activeId} />}
					{items.map((item, index) => (
						<TabItem key={item.label + index} isMobile={false} item={item} activeId={activeId} />
					))}
				</div>
			</div>
		</nav>
	);
}
