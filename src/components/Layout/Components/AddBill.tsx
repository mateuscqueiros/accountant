import { ActionIcon, Box, Button, Checkbox, Flex, Group, Modal, MultiSelect, NumberInput, Select, TextInput, Textarea, Tooltip, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FormFields, initialValues, setValues } from "@/store/features/form/formSlice";
import { useForm } from "@mantine/form";
import { getTransformObject, getValidateObject, sanitizeBeforeCommiting } from "@/utils/sanitizeForm";
import { openModal, resetModal, selectModal, setAction } from "@/store/features/modal/modalSlice";
import { useEffect } from "react";
import { createItem, updateItem } from "@/store/features/data/dataSlice";
import { v4 as uuidv4 } from 'uuid';

export default function AddBill({
    tags,
}: {
    tags: string[],
}) {

    const modal = useAppSelector(selectModal);
    const dispatch = useAppDispatch();

    const theme = useMantineTheme();
    const extraSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const form = useForm<FormFields>({
        initialValues,
        validate: getValidateObject(),
        transformValues: (values) => (getTransformObject(values))
    });

    const handleSubmit = (values: FormFields) => {
        if (modal.action === "update") {
            dispatch(updateItem(sanitizeBeforeCommiting(modal.updateItem, values)))
            dispatch(resetModal());
        } else {
            form.reset();
            dispatch(resetModal());
            dispatch(setValues(values));
            dispatch(createItem(sanitizeBeforeCommiting(uuidv4(), values)));
        }
    }

    useEffect(() => {
        form.setValues(modal.command);
    }, [modal.command]);

    return (
        <>
            <Modal opened={modal.opened} onClose={() => {
                dispatch(resetModal());
            }} title={modal.action === "create" ? "Criar item" : "Atualizar item"}>
                <Box p="1rem" pt={0}>
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <TextInput
                            withAsterisk
                            label="Nome"
                            placeholder="Nome do item"
                            mb="md"
                            {...form.getInputProps('label')}
                        />
                        <NumberInput
                            withAsterisk
                            label="Valor"
                            placeholder="$ 5,00"
                            mb="md"
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            formatter={(value) =>
                                !Number.isNaN(parseFloat(value))
                                    ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                    : '$ '
                            }
                            {...form.getInputProps('value')}
                        />
                        <Select
                            withAsterisk
                            label="Tipo"
                            placeholder="Escolha um tipo"
                            mb="md"
                            data={[
                                { value: 'monthly', label: 'Mensal' },
                                { value: 'installment', label: 'Parcelada' },
                                { value: 'fixed', label: 'Fixa' },
                            ]}
                            {...form.getInputProps('type')}
                        />
                        {form.values.type === "installment" && (
                            <Flex justify="space-between" direction={extraSmallScreen ? "column" : "row"} sx={{ gap: "0.5rem" }}>
                                <NumberInput
                                    withAsterisk
                                    label="Parcela atual"
                                    placeholder="Menor que o total"
                                    mb="md"
                                    {...form.getInputProps('installments.current')}
                                />
                                <NumberInput
                                    withAsterisk
                                    label="Total de parcelas"
                                    placeholder="Número"
                                    mb="md"
                                    {...form.getInputProps('installments.total')}
                                />
                                <NumberInput
                                    withAsterisk
                                    label="Vencimento"
                                    placeholder="Número"
                                    mb="md"
                                    {...form.getInputProps('installments.dueDay')}
                                />
                            </Flex>
                        )}
                        {form.values.type === "fixed" && (
                            <NumberInput
                                withAsterisk
                                label="Vencimento"
                                placeholder="Dia"
                                mb="md"
                                {...form.getInputProps('fixed.dueDay')}
                            />
                        )}
                        <Group sx={{ alignItems: "center" }}>
                            <DateInput
                                sx={{ flex: 1 }}
                                withAsterisk
                                label="Data"
                                placeholder="01/01/2023"
                                mb="md"
                                {...form.getInputProps('date')}
                                value={new Date(form.values.date === "" ? new Date() : form.values.date)}
                                onChange={(e) => { form.setFieldValue("date", e && e.toString() ? e.toString() : "") }}
                            />
                            <Checkbox
                                mt={10}
                                label="Ativo"
                                defaultChecked={true}
                                {...form.getInputProps('active')}
                            />
                        </Group>

                        <MultiSelect
                            label="Tags"
                            placeholder="Selecione etiquetas"
                            mb="md"
                            data={tags}
                            searchable
                            {...form.getInputProps('tags')}
                        />
                        <Textarea
                            label="Notas"
                            mb="md"
                            placeholder="Descreva o item"
                            autosize
                            {...form.getInputProps('notes')}
                        />
                        <Group position="right" mt="xl">
                            <Button variant="outline" onClick={() => {
                                form.validate()
                            }}>Validar</Button>
                            <Button variant="outline" onClick={() => {
                                form.reset()
                            }}>Resetar</Button>
                            <Button variant="outline" onClick={() => {
                                form.reset()
                                form.clearErrors();
                                form.resetDirty();
                                form.resetTouched();
                                dispatch(resetModal());
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
                    onClick={() => {
                        form.reset();
                        dispatch(openModal());
                    }}
                >
                    <IconPlus size="1.3rem" />
                </ActionIcon>
            </Tooltip>
        </>
    )
}