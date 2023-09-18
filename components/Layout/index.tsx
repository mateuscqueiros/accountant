import { DataContext } from '@/contexts/DataContext';
import {
	AppShell,
	Box,
	Burger,
	Flex,
	Group,
	Header,
	Navbar,
	Stack,
	useMantineTheme,
} from '@mantine/core';
import { useColorScheme, useMediaQuery } from '@mantine/hooks';
import { IconChartBar, IconHome2, IconPigMoney, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { NavIcon } from './Components/NavIcons';
import { NavUser } from './Components/NavUser';
import ToggleTheme from './Components/ToggleTheme';

const HeaderComponent = ({
	opened,
	setOpened,
}: {
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const theme = useMantineTheme();
	const colorScheme = useColorScheme();
	const largeScreen = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	return (
		<Header height={largeScreen ? 70 : 50} px="1rem">
			<Flex align="center" justify="space-between" h="100%">
				<Burger
					style={{
						'@media(min-width: 48rem)': {
							display: 'none',
						},
					}}
					opened={opened}
					onClick={() => setOpened((o) => !o)}
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
		</Header>
	);
};

const NavbarComponent = ({ user, opened }: { user: any; opened: boolean }) => {
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

	const theme = useMantineTheme();
	return (
		<Navbar p="0.5rem" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 60 }}>
			<Navbar.Section grow mt="md" id="nav-icons">
				<Stack>
					{options.map((item, index) => {
						return <NavIcon key={index} icon={item.icon} label={item.label} link={item.link} />;
					})}
				</Stack>
			</Navbar.Section>
			<Navbar.Section id="nav-user">
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
			</Navbar.Section>
		</Navbar>
	);
};

const Layout = ({ children, active }: { children: any; active?: number }) => {
	const data = useContext(DataContext);

	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const [user, setUser] = useState(data.user);

	return (
		<AppShell
			styles={{
				main: {
					background: colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			navbar={<NavbarComponent user={user} opened={opened} />}
			header={<HeaderComponent opened={opened} setOpened={setOpened} />}
		>
			<Box h="100%" p="1rem" w="100%">
				{children}
			</Box>
		</AppShell>
	);
};

export default Layout;
