import { Text } from '@mantine/core';
import { ConfigTabContext } from 'app/user/page';
import { useContext } from 'react';
import { Categories, User, Wrapper } from '.';

export function ConfigTab() {
	const tabs = useContext(ConfigTabContext);

	return <Wrapper title={tabs.active.label}>{selectActiveTab(tabs.active.id)}</Wrapper>;
}

function selectActiveTab(tabId: number) {
	switch (tabId) {
		case 1:
			return <Categories />;
		case 0:
			return <User />;
		default:
			return <Text>Selecione uma tab</Text>;
	}
}
