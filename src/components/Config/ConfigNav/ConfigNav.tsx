import { Box, Container, ScrollArea, Tabs, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import Link from 'next/link';
import navBarClasses from './NavBar.module.css';
import tabClasses from './Tabs.module.css';

interface NavItem {
	id: number;
	label: string;
	color: string | undefined;
}

function AllNavItem({
	isMobile,
	activeId,
	route,
}: {
	isMobile: boolean;
	activeId: number | null;
	route: string;
}) {
	const theme = useMantineTheme();
	const mobile = (
		<Link className={tabClasses.link} href={route}>
			<Tabs.Tab value={String(null)}>Todas</Tabs.Tab>
		</Link>
	);

	console.log(theme.primaryColor);

	const desktop = (
		<Link className={navBarClasses.link_wrapper} href={route}>
			<Box
				bg={activeId === null ? theme.primaryColor : undefined}
				className={navBarClasses.link}
				data-active={activeId === null}
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
	activeId,
	route,
}: {
	isMobile: boolean;
	item: NavItem;
	activeId: number | null;
	route: string;
}) {
	const mobile = (
		<Link key={item.id} className={tabClasses.link} href={`${route}/${item.id}`}>
			<Tabs.Tab value={String(item.id)} key={item.label}>
				{item.label}
			</Tabs.Tab>
		</Link>
	);

	const desktop = (
		<Link className={navBarClasses.link_wrapper} key={item.id} href={`${route}/${String(item.id)}`}>
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

export function ConfigNav({
	title,
	items,
	activeId,
	route,
}: {
	title: string;
	items: NavItem[];
	activeId: number | null;
	route: string;
}) {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.other.mobile}`);
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
						{<AllNavItem route={route} isMobile={true} activeId={activeId} />}
						{items.map((item, index) => (
							<TabItem
								route={route}
								key={item.label + index}
								isMobile={true}
								item={item}
								activeId={activeId}
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
					{<AllNavItem route={route} isMobile={false} activeId={activeId} />}
					{items.map((item, index) => (
						<TabItem
							route={route}
							key={item.label + index}
							isMobile={false}
							item={item}
							activeId={activeId}
						/>
					))}
				</div>
			</div>
		</nav>
	);
}
