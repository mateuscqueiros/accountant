import { Container, Flex, Title } from '@mantine/core';
import { ReactElement } from 'react';

export function Wrapper({ children, title }: { children: ReactElement; title: string }) {
	return (
		<Container p="lg" w="100%" m={0}>
			<Title mb="lg">{title}</Title>
			<Flex w="100%" align="flex-start" direction="column">
				{children}
			</Flex>
		</Container>
	);
}
