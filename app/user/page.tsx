'use client';
import { DoubleNavbar } from '@/components/DoubleNavbar';
import { tabsData } from '@/shared/index';
import { ActiveTabContextType, TabType } from '@/shared/types';
import { Flex } from '@mantine/core';
import { ReactNode, createContext, useState } from 'react';

export const UserTabContext = createContext<ActiveTabContextType>({} as ActiveTabContextType);

export function UserTabProvider({ children }: { children: ReactNode }) {
	const setActive = (id: number) => {
		setActiveTab(
			tabsData.filter((tab) => {
				return tab.id === id;
			})[0]
		);
	};

	const [active, setActiveTab] = useState<TabType>(tabsData[0]);

	return (
		<UserTabContext.Provider
			value={{
				active,
				values: tabsData,
				setActive,
			}}
		>
			{children}
		</UserTabContext.Provider>
	);
}

export default function UserPage() {
	return (
		<UserTabProvider>
			<Flex>
				<DoubleNavbar />
				<div>Other content</div>
			</Flex>
		</UserTabProvider>
	);
}
