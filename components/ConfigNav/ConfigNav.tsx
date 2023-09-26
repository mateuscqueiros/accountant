import { tabsData } from '@/shared/consts/userTab.consts';
import { Container, Flex, ScrollArea, Tabs, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import { ConfigTabContext } from 'app/user/page';
import { useContext } from 'react';
import doubleNavBarclasses from './DoubleNavBar.module.css';
import tabClasses from './Tabs.module.css';

export function ConfigNav() {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`);
	const { width } = useViewportSize();

	const configTab = useContext(ConfigTabContext);

	const items = tabsData.map((tab) => (
		<Tabs.Tab
			onClick={() => {
				configTab.setActive(tab.id);
			}}
			value={tab.label}
			key={tab.label}
		>
			{tab.label}
		</Tabs.Tab>
	));

	const links = tabsData.map((link) => (
		<div
			className={doubleNavBarclasses.link}
			data-active={configTab.active.id === link.id || undefined}
			onClick={() => {
				configTab.setActive(link.id);
			}}
			key={link.label}
		>
			{link.label}
		</div>
	));

	return isMobile ? (
		<Container size="md" p={0}>
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
					<Flex direction="row" w={width} h={50}>
						{items.map((item, index) => {
							return item;
						})}
					</Flex>
				</Tabs>
			</ScrollArea>
		</Container>
	) : (
		<nav className={doubleNavBarclasses.navbar}>
			<div className={doubleNavBarclasses.wrapper}>
				<div className={doubleNavBarclasses.main}>
					<Title order={4} className={doubleNavBarclasses.title}>
						Editar dados
					</Title>
					{links}
				</div>
			</div>
		</nav>
	);
}
