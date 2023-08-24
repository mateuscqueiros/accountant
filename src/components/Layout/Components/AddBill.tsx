import { ActionIcon, Box, Button, Flex, Group, Modal, MultiSelect, NumberInput, Select, TextInput, Tooltip, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IForm, createNewItem, resetValues, selectForm, setFieldValue, setValues } from "@/store/features/form/formSlice";
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
    const theme = useMantineTheme();
    // Reducer - Form
    const formState = useAppSelector(selectForm);
    const dispatch = useAppDispatch();

    const initialValues: IForm = {
        label: '',
        value: 0,
        date: new Date().toString(),
        type: 'monthly',
        tags: ["Outro"],
        installments: {
            current: 1,
            total: 2,
            dueDay: 1
        },
        fixed: {
            dueDay: 1
        }
    }

    const extraSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    // const [formValues, setFormValues] = useState<IForm>(initialValues);
    const [formErrors, setFormErrors] = useState<FormErrorType[]>([]);

    useEffect(() => {
        setFormErrors([]);
    }, [formState])

    const handleSubmit = () => {
        const errors = validateForm(formState)
        if (errors.length === 0) {
            actions.close();
            console.log(formState);
            dispatch(resetValues());
            dispatch(createNewItem());
        } else {
            setFormErrors(errors);
            console.log("Erro ao criar: ");
            console.table(errors);
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
                            error={getFieldErrorMessages(formErrors, "label")[0]?.message}
                            label="Nome"
                            placeholder="Nome do item"
                            mb="md"
                            value={formState.label}
                            onChange={(e) => dispatch(setFieldValue({ field: "type", newValue: e }))}
                        />
                        <NumberInput
                            withAsterisk
                            error={getFieldErrorMessages(formErrors, "value")[0]?.message}
                            label="Valor"
                            placeholder="$ 5,00"
                            mb="md"
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            formatter={(value) =>
                                !Number.isNaN(parseFloat(value))
                                    ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                    : '$ '
                            }
                            value={formState.value}
                            onChange={(e) => setFormValues({
                                ...formState,
                                value: e
                            })}
                        />
                        <Button>{formState.type}</Button>
                        <Select
                            withAsterisk
                            error={getFieldErrorMessages(formErrors, "type")[0]?.message}
                            label="Tipo"
                            placeholder="Escolha um tipo"
                            mb="md"
                            data={[
                                { value: 'monthly', label: 'Mensal' },
                                { value: 'installment', label: 'Parcelada' },
                                { value: 'fixed', label: 'Fixa' },
                            ]}
                            // value={formValues.type}
                            value={formState.type}
                            onChange={(e) => {
                                dispatch(setFieldValue({ field: "type", newValue: e }))
                                // setFormValues({
                                //     ...formValues,
                                //     type: e ? e : ""
                                // })
                            }}
                        />
                        {formValues.type === "installment" && (
                            <Flex justify="space-between" direction={extraSmallScreen ? "column" : "row"} sx={{ gap: "0.5rem" }}>
                                <NumberInput
                                    withAsterisk
                                    error={getFieldErrorMessages(formErrors, "installments.current")[0]?.message}
                                    label="Parcela atual"
                                    placeholder="Menor que o total"
                                    mb="md"
                                    value={formValues.installments.current}
                                    onChange={(e) => setFormValues({
                                        ...formValues,
                                        installments: {
                                            ...formValues.installments,
                                            current: e
                                        }
                                    })}
                                />
                                <NumberInput
                                    withAsterisk
                                    error={getFieldErrorMessages(formErrors, "installments.total")[0]?.message}
                                    label="Total de parcelas"
                                    placeholder="Número"
                                    mb="md"
                                    value={formValues.installments.total}
                                    onChange={(e) => setFormValues({
                                        ...formValues,
                                        installments: {
                                            ...formValues.installments,
                                            total: e
                                        }
                                    })}
                                />
                                <NumberInput
                                    withAsterisk
                                    error={getFieldErrorMessages(formErrors, "installments.dueDay")[0]?.message}
                                    label="Vencimento"
                                    placeholder="Número"
                                    mb="md"
                                    value={formValues.installments.dueDay}
                                    onChange={(e) => setFormValues({
                                        ...formValues,
                                        installments: {
                                            ...formValues.installments,
                                            dueDay: e
                                        }
                                    })}
                                />
                            </Flex>
                        )}
                        {formValues.type === "fixed" && (
                            <NumberInput
                                withAsterisk
                                error={getFieldErrorMessages(formErrors, "fixed.dueDay")[0]?.message}
                                label="Vencimento"
                                placeholder="Dia"
                                mb="md"
                                value={formValues.fixed.dueDay}
                                onChange={(e) => setFormValues({
                                    ...formValues,
                                    fixed: {
                                        ...formValues.fixed,
                                        dueDay: e
                                    }
                                })}
                            />
                        )}
                        <DateInput
                            error={getFieldErrorMessages(formErrors, "date")[0]?.message}
                            label="Data"
                            placeholder="01/01/2023"
                            mb="md"
                            value={new Date(formValues.date)}
                            onChange={(e) => setFormValues({ ...formValues, date: new Date(e || "").toString() })}
                        />
                        <MultiSelect
                            error={getFieldErrorMessages(formErrors, "tags")[0]?.message}
                            label="Tags"
                            placeholder="Selecione etiquetas"
                            mb="md"
                            data={tags}
                            searchable
                            value={formValues.tags}
                            onChange={(e) => setFormValues({ ...formValues, tags: e })}
                        />
                        <Group position="right" mt="xl">
                            <Button variant="outline" onClick={() => {
                                setFormErrors([]);
                                setFormValues(initialValues);
                            }}>Resetar</Button>
                            <Button variant="outline" onClick={() => {
                                actions.close();
                                setFormValues(initialValues);
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