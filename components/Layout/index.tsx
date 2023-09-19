'use client';

import { DataContext } from '@/contexts/DataContext';
import { AppShell, Box, Burger, Flex, Group, Stack, rem, useMantineTheme } from '@mantine/core';
import { useColorScheme, useMediaQuery } from '@mantine/hooks';
import { IconChartBar, IconHome2, IconPigMoney, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { NavIcon } from './Components/NavIcons';
import ToggleTheme from './Components/ToggleTheme';
import classes from './Layout.module.css';

const HeaderComponent = ({
	opened,
	setOpened,
}: {
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const theme = useMantineTheme();
	const largeScreen = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	return (
		<Box w="100%" px="1rem" h="100%">
			<Flex align="center" justify="space-between" h="100%">
				<Burger
					hiddenFrom="sm"
					style={{
						display: largeScreen ? 'none' : 'block',
					}}
					opened={!opened}
					onClick={() => setOpened(!opened)}
					size="sm"
					color={theme.colors.gray[6]}
					mr="xl"
				/>
				<Group style={{ height: '100%' }}>
					<Link href="/">
						<IconPigMoney size="2rem" />
					</Link>
				</Group>
				<Group>
					<ToggleTheme />
				</Group>
			</Flex>
		</Box>
	);
};

const NavbarComponent = ({
	user,
	setOpened,
}: {
	user: any;
	setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
	const colorScheme = useColorScheme();

	const options = [
		{
			icon: <IconHome2 />,
			label: 'Início',
			link: '/',
		},
		{
			icon: <IconUser />,
			label: 'Usuário',
			link: '/user',
		},
		{
			icon: <IconChartBar />,
			label: 'Relatórios',
			link: '/reports',
		},
	];

	return (
		<>
			<Box p={rem('8px')}>
				<Box mt="md">
					<Stack>
						{options.map((item, index) => {
							const { icon, label, link } = item;
							return (
								<NavIcon
									key={index}
									data={{
										icon,
										label,
										link,
										setOpened,
									}}
								/>
							);
						})}
					</Stack>
				</Box>
				{/* <Box id="nav-user">
					<Box
						style={{
							paddingTop: theme.spacing.sm,
							borderTop: `0.1rem solid ${
								colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
							}`,
						}}
					>
						<NavUser user={user} />
					</Box>
				</Box> */}
			</Box>
		</>
	);
};

const Layout = ({ children, active }: { children: any; active?: number }) => {
	const data = useContext(DataContext);

	const colorScheme = useColorScheme();
	const dark = colorScheme === 'dark';
	const [opened, setOpened] = useState(false);

	useEffect(() => {
		console.log(opened);
	}, [opened]);

	return (
		<AppShell
			className={classes.app_shell}
			navbar={{
				width: { sm: 60 },
				breakpoint: 'sm',
				collapsed: { mobile: opened, desktop: false },
			}}
			header={{ height: 60 }}
		>
			<AppShell.Header>
				<HeaderComponent opened={opened} setOpened={setOpened} />
			</AppShell.Header>
			<AppShell.Navbar>
				<NavbarComponent user={data.user} setOpened={setOpened} />
			</AppShell.Navbar>
			<AppShell.Main>
				<Box p="2rem" mx="auto" maw={rem('1900px')}>
					{children}
				</Box>
			</AppShell.Main>
		</AppShell>
	);
};

export default Layout;
