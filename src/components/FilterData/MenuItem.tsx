import { Checkbox, Menu } from '@mantine/core';
import { useState } from 'react';

interface MenuItemProps {
	children: any;
}

export function MenuItem({ children }: MenuItemProps) {
	const [checked, setChecked] = useState(false);

	return (
		<>
			<Menu.Item
				onClick={() => setChecked(!checked)}
				leftSection={<Checkbox onChange={() => setChecked(!checked)} checked={checked} />}
			>
				{children}
			</Menu.Item>
		</>
	);
}
