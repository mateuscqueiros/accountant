'use client';
import { useColors } from '@/lib/theme';
import { AppShell, Box, Burger, Flex, Group, Stack, rem, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChartBar, IconHome2, IconList, IconWallet } from '@tabler/icons-react';
import Link from 'next/link';
import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { NavIcon, ToggleTheme } from '.';
import { IconLogo } from '../Icons';
import { VersionBadge } from '../Meta/VersionBadge/VersionBadge';
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
	const colors = useColors();

	return (
		<Box w="100%" px="1rem" h="100%">
			<Flex align="center" justify="space-between" h="100%">
				<Burger
					hiddenFrom="sm"
					style={{
						display: largeScreen ? 'none' : 'block',
					}}
					opened={opened}
					onClick={() => setOpened(!opened)}
					size="sm"
					color={theme.colors.gray[6]}
					mr="xl"
				/>
				<Group style={{ height: '100%' }}>
					<Link href="/">
						<IconLogo color={colors.logo} size="2rem" />
					</Link>
				</Group>
				<Group>
					<VersionBadge />
					<ToggleTheme />
				</Group>
			</Flex>
		</Box>
	);
};

const NavbarComponent = ({ setOpened }: { setOpened: Dispatch<SetStateAction<boolean>> }) => {
	const options = [
		{
			icon: <IconHome2 />,
			label: 'Início',
			link: '/',
		},
		{
			icon: <IconList />,
			label: 'Categorias',
			link: '/categories',
		},
		{
			icon: <IconWallet />,
			label: 'Carteiras',
			link: '/wallets',
		},
		{
			icon: <IconChartBar />,
			label: 'Relatórios',
			link: '/reports',
		},
	];

	return (
		<>
			<Box p={rem('8px')} mt="md">
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
		</>
	);
};

export function Layout({
	children,
	withPadding = true,
}: PropsWithChildren<{ withPadding?: boolean }>) {
	const [opened, setOpened] = useState(false);

	return (
		<AppShell
			className={classes.app_shell}
			navbar={{
				width: { sm: 60 },
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
			}}
			header={{ height: 60 }}
		>
			<AppShell.Header>
				<HeaderComponent opened={opened} setOpened={setOpened} />
			</AppShell.Header>
			<AppShell.Navbar>
				<NavbarComponent setOpened={setOpened} />
			</AppShell.Navbar>
			<AppShell.Main>
				{withPadding ? (
					<Box p="2rem" mx="auto" maw={rem('1900px')}>
						{children}
					</Box>
				) : (
					children
				)}
			</AppShell.Main>
		</AppShell>
	);
}
