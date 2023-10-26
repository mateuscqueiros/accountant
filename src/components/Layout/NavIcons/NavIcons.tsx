'use client';
import { Group, Text, Tooltip, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import classes from './NavIcons.module.css';

export type NavIconProps = {
	icon: JSX.Element;
	label: string;
	link: string;
	setOpened: Dispatch<SetStateAction<boolean>>;
};

export const NavIcon = ({ data }: { data: NavIconProps }) => {
	const { icon, label, link, setOpened } = data;
	const path = usePathname().split('/');

	let isActive = link.split('/')[1] === path[1];

	return (
		<Link
			onClick={() => {
				setOpened(false);
			}}
			href={link}
			className={classes.link}
			style={{ textDecoration: 'inherit' }}
		>
			<Tooltip label={label} position="right" visibleFrom={'sm'}>
				<UnstyledButton className={[classes.unstyled_button, isActive && classes.active].join(' ')}>
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
