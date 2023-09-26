import { tabsData } from '@/shared/consts/userTab.consts';
import { Title } from '@mantine/core';
import { UserTabContext } from 'app/user/page';
import { useContext } from 'react';
import classes from './DoubleNavbar.module.css';

export function DoubleNavbar() {
	const userTab = useContext(UserTabContext);

	const links = tabsData.map((link) => (
		<div
			className={classes.link}
			data-active={userTab.active.id === link.id || undefined}
			onClick={() => {
				userTab.setActive(link.id);
			}}
			key={link.label}
		>
			{link.label}
		</div>
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
