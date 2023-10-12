import { rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

type NotificationProp = {
	title?: string;
	message: string;
};

export function NotificationError(data: NotificationProp) {
	const { title, message } = data;
	const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

	return notifications.show({
		title: title || 'Erro',
		message,
		icon: xIcon,
		color: 'red',
	});
}
