'use client';
import { Group, Text, Tooltip, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback } from 'react';
import classes from './NavIcons.module.css';

export type NavIconType = {
	icon: JSX.Element;
	label: string;
	link: string;
	setOpened: Dispatch<SetStateAction<boolean>>;
};

export const NavIcon = ({ data }: { data: NavIconType }) => {
	const { icon, label, link, setOpened } = data;
	const getActiveNavTab = useCallback((link: string) => {
		const path = usePathname().split('/');

		return link.split('/')[1] === path[1];
	}, []);

	let active = getActiveNavTab(link);

	return (
		<Link
			onClick={() => {
				setOpened(false);
			}}
			href={link}
			className={classes.link}
			style={{ textDecoration: 'inherit' }}
		>
			<Tooltip label={label} position="right">
				<UnstyledButton className={[classes.unstyled_button, active && classes.active].join(' ')}>
					<Group>
						{icon}
						<Text className={classes.text} size="sm">
							{label}
						</Text>
					</Group>
				</UnstyledButton>
			</Tooltip>
		</Link>
	);
};
