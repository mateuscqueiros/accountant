import { Title } from '@mantine/core';
import {
	IconCalendarStats,
	IconDeviceDesktopAnalytics,
	IconFingerprint,
	IconGauge,
	IconHome2,
	IconSettings,
	IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';
import classes from './DoubleNavbar.module.css';

const mainLinksMockdata = [
	{ icon: IconHome2, label: 'Home' },
	{ icon: IconGauge, label: 'Dashboard' },
	{ icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
	{ icon: IconCalendarStats, label: 'Releases' },
	{ icon: IconUser, label: 'Account' },
	{ icon: IconFingerprint, label: 'Security' },
	{ icon: IconSettings, label: 'Settings' },
];

const linksMockdata = ['Usuário', 'Carteiras', 'Categorias'];

export function DoubleNavbar() {
	const [active, setActive] = useState('Releases');
	const [activeLink, setActiveLink] = useState('Settings');

	const links = linksMockdata.map((link) => (
		<a
			className={classes.link}
			data-active={activeLink === link || undefined}
			href="#"
			onClick={(event) => {
				event.preventDefault();
				setActiveLink(link);
			}}
			key={link}
		>
			{link}
		</a>
	));

	return (
		<nav className={classes.navbar}>
			<div className={classes.wrapper}>
				<div className={classes.main}>
					<Title order={4} className={classes.title}>
						Editar dados
					</Title>

					{links}
				</div>
			</div>
		</nav>
	);
}
