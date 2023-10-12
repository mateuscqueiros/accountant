import { rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

type NotificationProp = {
	title?: string;
	message: string;
};

export function NotificationSuccess(data: NotificationProp) {
	const { title, message } = data;
	const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

	notifications.show({
		title: title || 'Sucesso',
		message,
		icon: checkIcon,
		color: 'green',
	});
}
