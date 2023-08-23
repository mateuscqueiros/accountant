import { ActionIcon, Box, Button, Flex, Group, Modal, MultiSelect, NumberInput, Select, TextInput, Tooltip, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useForm, yupResolver } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { useEffect } from "react";
import { FormValues } from "@/contexts/CreateFormContext";
import { useMediaQuery } from "@mantine/hooks";
import * as Yup from 'yup';

const schema = Yup.object().shape({
    label: Yup.string()
        .min(2, "Nome deve ter pelo menos 2 caracteres"),
    value: Yup.number()
        .typeError("Por favor insira um valor")
        .positive("Deve ser maior que 0"),
    date: Yup.date()
        .typeError("Deve ser uma data"),
    installments: Yup.object().shape({
        current: Yup.number().when('type', {
            is: (val: string) => val === "installment",
            then: (schema) => schema
                .typeError("Por favor insira um valor")
                .min(1, "O valor mínimo é 1")
                .integer("Deve ser um número inteiro")
                .test(
                    'max',
                    'O valor é maior ou igual ao total',
                    (value, context) => (value || 0) < context.parent.total,
                ),
            otherwise: (schema) => schema.notRequired(),
        }),
        total: Yup.number().when('type', {
            is: (val: string) => (val === "installment"),
            then: (schema) => schema.typeError("Por favor insira um valor").min(1, "O valor mínimo é 1"),
            otherwise: (schema) => schema.notRequired()
        }),
        dueDay: Yup.number().when('type', {
            is: (val: string) => val === "installment",
            then: (schema) => schema.typeError("Por favor insira um valor")
                .min(1, "O valor deve estar entre 1-31")
                .max(31, "O valor deve estar entre 1-31")
                .integer("O número deve ser inteiro"),
            otherwise: (schema) => schema.notRequired(),
        })
    }),
    fixed: Yup.object().shape({
        dueDay: Yup.number().when('type', {
            is: (val: string) => val === "fixed",
            then: (schema) => schema
                .typeError("Por favor insira um valor")
                .min(1, "O valor deve estar entre 1-31")
                .max(31, "O valor deve estar entre 1-31")
                .integer("O número deve ser inteiro"),
            otherwise: (schema) => schema.notRequired(),
        })
    })
});

// Yup.number()
//             .typeError("Por favor insira um valor")
//             .min(1, "O valor deve estar entre 1-31")
//             .max(31, "O valor deve estar entre 1-31")
//             .integer("O número deve ser inteiro")

export default function AddBill({
    tags,
    setTags,
    setValues,
    values,
    state,
    actions
}: {
    tags: string[],
    setTags: any,
    setValues: any,
    values: FormValues,
    state: boolean,
    actions: {
        open: () => void;
        close: () => void;
        toggle: () => void;
    }
}) {
    const theme = useMantineTheme();
    const extraSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const form = useForm<FormValues>({
        initialValues: values,
        validate: yupResolver(schema),
        transformValues: (values) => ({
            ...values,
            tags: values.tags.length ? values.tags : ["Outro"]
        })
    });

    const validate = () => {
        console.log(form.values)
        form.validate()
    }

    const handleSubmit = (values: FormValues) => {
        console.log(values);
        actions.close();
        form.reset();
    }

    useEffect(() => {
        form.setValues(values)
    }, [values]);

    return (
        <>
            <Modal opened={state} onClose={() => {
                actions.close();
                form.reset();
            }} title="Criar novo item">
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
                            placeholder="R$ 5,00"
                            mb="md"
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
                                    {...form.getInputProps("installments.current")}
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
                                {...form.getInputProps("fixed.dueDay")}
                            />
                        )}
                        <DateInput
                            clearable
                            label="Data"
                            placeholder="01/01/2023"
                            mb="md"
                            {...form.getInputProps('date')}
                        />
                        <MultiSelect
                            label="Tags"
                            placeholder="Selecione etiquetas"
                            mb="md"
                            data={tags}
                            searchable
                            creatable
                            getCreateLabel={(query) => `+ Criar ${query}`}
                            onCreate={(query) => {
                                const item = query;
                                setTags((current: any) => [...current, item]);
                                return item;
                            }}
                            {...form.getInputProps('tags')}
                        />
                        <Group position="right" mt="xl">
                            <Button variant="outline" onClick={() => validate()}>Verificar</Button>
                            <Button variant="outline" onClick={() => {
                                actions.close();
                                form.reset();
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