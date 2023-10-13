import { ActionIcon as MntActionIcon, ActionIconProps as MntActionIconProps } from '@mantine/core';
import React from 'react';

interface ActionIconProps {
	onClick?: (e?: any) => void;
}

export const ActionIcon = React.forwardRef<HTMLButtonElement, ActionIconProps & MntActionIconProps>(
	(props: ActionIconProps & MntActionIconProps, ref) => {
		const { children } = props;

		return (
			<MntActionIcon ref={ref} variant="default" size="2.1rem" {...props}>
				{children}
			</MntActionIcon>
		);
	}
);
