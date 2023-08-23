import { Avatar, Box, Center, Flex, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";


export const NavUser = ({ user }: { user: any }) => {
    return (
        <UnstyledButton
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                },
            })}
        >
            <Center>
                <Avatar
                    src={user.image}
                    radius="xl"
                />
                <Flex ml="md" w="100%" direction="row" align="center" sx={(theme) => ({
                    display: "flex",
                    '@media(min-width: 48rem)': {
                        display: "none"
                    },
                })}>
                    <Box sx={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
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
    )
}