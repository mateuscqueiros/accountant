import { Container, Flex, Title, useMantineTheme } from '@mantine/core';
import { PropsWithChildren } from 'react';

export function ConfigContentWrapper({
	children,
	title,
	rightSection,
	center,
}: PropsWithChildren<{ title: string; rightSection?: JSX.Element; center?: boolean }>) {
	const theme = useMantineTheme();

	return (
		<Container p="lg" w="100%" mx="auto" maw={center && theme.other.centerMaw}>
			<Flex direction={'row'} justify={'space-between'} wrap={'wrap'}>
				<Title mb="lg">{title}</Title>
				{rightSection}
			</Flex>
			<Flex w="100%" align="flex-start" direction="column">
				{children}
			</Flex>
		</Container>
	);
}
