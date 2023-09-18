import { Avatar, Box, Center, Flex, Text, UnstyledButton } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';

export const NavUser = ({ user }: { user: any }) => {
	const colorScheme = useColorScheme();

	return (
		<UnstyledButton
			style={(theme) => ({
				display: 'block',
				width: '100%',
				padding: theme.spacing.xs,
				borderRadius: theme.radius.sm,
				color: colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

				'&:hover': {
					backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
				},
			})}
		>
			<Center>
				<Avatar src={user.image} radius="xl" />
				<Flex
					ml="md"
					w="100%"
					direction="row"
					align="center"
					style={(theme) => ({
						display: 'flex',
						'@media(min-width: 48rem)': {
							display: 'none',
						},
					})}
				>
					<Box style={{ flex: 1 }}>
						<Text size="sm" fw={500}>
							{user.name}
						</Text>
						<Text color="dimmed" size="xs">
							{user.email}
						</Text>
					</Box>

					<IconChevronRight size="1rem" />
				</Flex>
			</Center>
		</UnstyledButton>
	);
};
