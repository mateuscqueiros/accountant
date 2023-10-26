import { Box, Container, ScrollArea, Tabs, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import Link from 'next/link';
import navBarClasses from './NavBar.module.css';
import tabClasses from './Tabs.module.css';

interface NavItem {
	slug: string;
	label: string;
	color: string | undefined;
}

function AllNavItem({
	isMobile,
	activeSlug,
	route,
}: {
	isMobile: boolean;
	activeSlug: string | null;
	route: string;
}) {
	const theme = useMantineTheme();
	const mobile = (
		<Link className={tabClasses.link} href={route}>
			<Tabs.Tab value={String(null)}>Todas</Tabs.Tab>
		</Link>
	);

	const desktop = (
		<Link className={navBarClasses.link_wrapper} href={route}>
			<Box
				bg={activeSlug === null ? theme.primaryColor : undefined}
				className={navBarClasses.link}
				data-active={activeSlug === null}
			>
				Todas
			</Box>
		</Link>
	);

	return isMobile ? mobile : desktop;
}

function TabItem({
	isMobile,
	item,
	activeSlug,
	route,
}: {
	isMobile: boolean;
	item: NavItem;
	activeSlug: string | null;
	route: string;
}) {
	const mobile = (
		<Link key={item.slug} className={tabClasses.link} href={`${route}/${item.slug}`}>
			<Tabs.Tab value={String(item.slug)} key={item.label}>
				{item.label}
			</Tabs.Tab>
		</Link>
	);

	const desktop = (
		<Link
			className={navBarClasses.link_wrapper}
			key={item.slug}
			href={`${route}/${String(item.slug)}`}
		>
			<Box
				bg={activeSlug === item.slug ? item.color : undefined}
				className={navBarClasses.link}
				data-active={activeSlug === item.slug}
			>
				{item.label}
			</Box>
		</Link>
	);

	return isMobile ? mobile : desktop;
}

export function ConfigNav({
	title,
	items,
	activeSlug,
	route,
}: {
	title: string;
	items: NavItem[];
	activeSlug: string | null;
	route: string;
}) {
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
				value={String(activeSlug)}
				classNames={{
					root: tabClasses.tabs,
					list: tabClasses.tabsList,
					tab: tabClasses.tab,
				}}
			>
				<ScrollArea offsetScrollbars="x">
					<Tabs.List w={width}>
						{<AllNavItem route={route} isMobile={true} activeSlug={activeSlug} />}
						{items.map((item, index) => (
							<TabItem
								key={item.label + index}
								route={route}
								isMobile={true}
								item={item}
								activeSlug={activeSlug}
							/>
						))}
					</Tabs.List>
				</ScrollArea>
			</Tabs>
		</Container>
	) : (
		<nav className={navBarClasses.navbar}>
			<div className={navBarClasses.wrapper}>
				<div className={navBarClasses.main}>
					<Text className={navBarClasses.title}>{title}</Text>
					{<AllNavItem route={route} isMobile={false} activeSlug={activeSlug} />}
					{items.map((item, index) => (
						<TabItem
							key={item.label + index}
							route={route}
							isMobile={false}
							item={item}
							activeSlug={activeSlug}
						/>
					))}
				</div>
			</div>
		</nav>
	);
}
