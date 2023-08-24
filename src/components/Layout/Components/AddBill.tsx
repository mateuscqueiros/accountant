import { ActionIcon, Box, Button, Flex, Group, Modal, MultiSelect, NumberInput, Select, TextInput, Tooltip, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IForm, createNewItem, resetErrors, resetValues, selectForm, setFieldValue, setFixedValues, setInstallmentsValues, setValues, transformValues, validateValues } from "@/store/features/form/formSlice";
import validateForm, { FormErrorType, transformForm } from "@/utils/validateForm";

function getFieldErrorMessages(items: FormErrorType[], field: string): Array<FormErrorType> {
    return items.filter(item => {
        return item.field === field
    });
}

export default function AddBill({
    tags,
    state,
    actions
}: {
    tags: string[],
    state: boolean,
    actions: {
        open: () => void;
        close: () => void;
        toggle: () => void;
    }
}) {

    // Reducer - Form
    const formState = useAppSelector(selectForm);
    const dispatch = useAppDispatch();

    const theme = useMantineTheme();
    const extraSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const handleSubmit = () => {
        dispatch(resetErrors());
        dispatch(validateValues());
        if (!formState.errors.length) {
            dispatch(transformValues());
            dispatch(resetValues());
            dispatch(createNewItem());
            // actions.close();
        } else {
            console.table(formState.errors);
        };
    }

    return (
        <>
            <Modal opened={state} onClose={() => {
                actions.close();
            }} title="Criar novo item">
                <Box p="1rem" pt={0}>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                        <TextInput
                            withAsterisk
                            error={getFieldErrorMessages(formState.errors, "label")[0]?.message}
                            label="Nome"
                            placeholder="Nome do item"
                            mb="md"
                            value={formState.fields.label}
                            onChange={(e) => dispatch(setFieldValue({ field: "label", newValue: e.currentTarget.value }))}
                        />
                        <NumberInput
                            withAsterisk
                            error={getFieldErrorMessages(formState.errors, "value")[0]?.message}
                            label="Valor"
                            placeholder="$ 5,00"
                            mb="md"
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            formatter={(value) =>
                                !Number.isNaN(parseFloat(value))
                                    ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                    : '$ '
                            }
                            value={formState.fields.value}
                            onChange={(e) => dispatch(setFieldValue({ field: "value", newValue: e }))}
                        />
                        <Select
                            withAsterisk
                            error={getFieldErrorMessages(formState.errors, "type")[0]?.message}
                            label="Tipo"
                            placeholder="Escolha um tipo"
                            mb="md"
                            data={[
                                { value: 'monthly', label: 'Mensal' },
                                { value: 'installment', label: 'Parcelada' },
                                { value: 'fixed', label: 'Fixa' },
                            ]}
                            value={formState.fields.type}
                            onChange={(e) => {
                                dispatch(setFieldValue({ field: "type", newValue: e }))
                            }}
                        />
                        {formState.fields.type === "installment" && (
                            <Flex justify="space-between" direction={extraSmallScreen ? "column" : "row"} sx={{ gap: "0.5rem" }}>
                                <NumberInput
                                    withAsterisk
                                    error={getFieldErrorMessages(formState.errors, "installments.current")[0]?.message}
                                    label="Parcela atual"
                                    placeholder="Menor que o total"
                                    mb="md"
                                    value={formState.fields.installments.current}
                                    onChange={(e) => dispatch(setInstallmentsValues({ field: "current", newValue: e }))}
                                />
                                <NumberInput
                                    withAsterisk
                                    error={getFieldErrorMessages(formState.errors, "installments.total")[0]?.message}
                                    label="Total de parcelas"
                                    placeholder="Número"
                                    mb="md"
                                    value={formState.fields.installments.total}
                                    onChange={(e) => dispatch(setInstallmentsValues({ field: "total", newValue: e }))}
                                />
                                <NumberInput
                                    withAsterisk
                                    error={getFieldErrorMessages(formState.errors, "installments.dueDay")[0]?.message}
                                    label="Vencimento"
                                    placeholder="Número"
                                    mb="md"
                                    value={formState.fields.installments.dueDay}
                                    onChange={(e) => dispatch(setInstallmentsValues({ field: "dueDay", newValue: e }))}
                                />
                            </Flex>
                        )}
                        {formState.fields.type === "fixed" && (
                            <NumberInput
                                withAsterisk
                                error={getFieldErrorMessages(formState.errors, "fixed.dueDay")[0]?.message}
                                label="Vencimento"
                                placeholder="Dia"
                                mb="md"
                                value={formState.fields.fixed.dueDay}
                                onChange={(e) => dispatch(setFixedValues({ field: "dueDay", newValue: e }))}
                            />
                        )}
                        <DateInput
                            withAsterisk
                            error={getFieldErrorMessages(formState.errors, "date")[0]?.message}
                            label="Data"
                            placeholder="01/01/2023"
                            mb="md"
                            value={new Date(formState.fields.date !== "" ? formState.fields.date : new Date())}
                            onChange={(e) => dispatch(setFieldValue({ field: "date", newValue: e?.toString() }))}
                        />
                        <MultiSelect
                            error={getFieldErrorMessages(formState.errors, "tags")[0]?.message}
                            label="Tags"
                            placeholder="Selecione etiquetas"
                            mb="md"
                            data={tags}
                            searchable
                            value={formState.fields.tags}
                            onChange={(e) => dispatch(setFieldValue({ field: "tags", newValue: e?.toString() }))}
                        />
                        <Group position="right" mt="xl">
                            <Button variant="outline" onClick={() => {
                                dispatch(resetErrors());
                                dispatch(validateValues());
                            }}>Validar</Button>
                            <Button variant="outline" onClick={() => {
                                dispatch(resetErrors());
                                dispatch(resetValues());
                            }}>Resetar</Button>
                            <Button variant="outline" onClick={() => {
                                actions.close();
                                dispatch(resetValues());
                            }}>Cancelar</Button>
                            <Button type="submit">Salvar</Button>
                        </Group>
                    </form>
                </Box>
            </Modal>

            <Tooltip label="Adicionar conta">
                <ActionIcon
                    size="2.1rem"
                    variant="default"
                    onClick={actions.open}
                >
                    <IconPlus size="1.3rem" />
                </ActionIcon>
            </Tooltip>
        </>
    )
}