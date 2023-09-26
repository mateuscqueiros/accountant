import { Text } from '@mantine/core';
import { ConfigTabContext } from 'app/user/page';
import { useContext } from 'react';
import { Categories } from '.';

export function ConfigTabs() {
	const tabs = useContext(ConfigTabContext);
	console.log(tabs);

	return selectActiveTab(tabs.active.id);
}

function selectActiveTab(tab: number) {
	switch (tab) {
		case 1:
			return Categories();
		default:
			return <Text>Selecione uma tab</Text>;
	}
}
