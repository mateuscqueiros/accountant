import { Container, Flex, Title } from '@mantine/core';
import { PropsWithChildren } from 'react';

export function ConfigContentWrapper({ children, title }: PropsWithChildren<{ title: string }>) {
	return (
		<Container p="lg" w="100%" m={0}>
			<Title mb="lg">{title}</Title>
			<Flex w="100%" align="flex-start" direction="column">
				{children}
			</Flex>
		</Container>
	);
}
