import { ActionIcon, Card, Flex, Table, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function DefaultTable({ title, children, onAddAction }: any) {

    return (
        <Card h="fit-content">
            <Flex justify="space-between">
                <Text fw={600} fz="xl">{title}</Text>
                <ActionIcon
                    variant="default"
                    radius="xl"
                    onClick={onAddAction}
                >
                    <IconPlus size="0.9rem" />
                </ActionIcon>
            </Flex>
            <Table withColumnBorders striped highlightOnHover sx={{ cursor: "pointer" }}>
                {children}
            </Table>
        </Card>
    )
}