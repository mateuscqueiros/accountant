import { Box, Group, Text, Tooltip, UnstyledButton, useMantineColorScheme, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";

export const NavIcon = ({ icon, label, link }: { icon: JSX.Element, label: string, link: string }) => {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";
    const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
    let active = getActiveNavTab(link);

    function getActiveNavTab(link: string) {
        const { asPath } = useRouter();

        const path = asPath.split("/");

        return link.split("/")[1] === path[1];

    }

    return (
        <Link href={link} style={{ textDecoration: "inherit" }}>
            <Tooltip label={label} position="right">
                <UnstyledButton
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: smallScreen ? 'flex-start' : 'center',
                        width: '100%',
                        padding: theme.spacing.xs,
                        borderRadius: theme.radius.sm,
                        color: dark ? (active ? theme.colors.gray[0] : theme.colors.gray[0]) : (active ? theme.black : theme.black),
                        backgroundColor: active ? (dark ? theme.colors.blue[5] : theme.colors.blue[1]) : "",
                        '&:hover': {
                            backgroundColor:
                                dark ? (active ? theme.colors.blue[7] : theme.colors.dark[6]) : (active ? theme.colors.blue[2] : theme.colors.gray[0]),
                        },
                    })}
                >
                    <Group>
                        {icon}

                        <Box sx={() => ({
                            display: "block",
                            '@media(min-width: 48rem)': {
                                display: "none"
                            },
                        })}><Text size="sm">{label}</Text></Box>

                    </Group>
                </UnstyledButton>
            </Tooltip>
        </Link>
    )
}