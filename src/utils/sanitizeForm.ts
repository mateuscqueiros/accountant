import { FormFields } from "@/store/features/form/formSlice";
import { FormValidateInput, _TransformValues } from "@mantine/form/lib/types";
import { useAppSelector } from "../store";
import { selectModal } from "@/store/features/modal/modalSlice";
import { BillsDataItemType } from "src/data";

export function getValidateObject(): FormValidateInput<FormFields> {
    /* Obtém um objeto "validate" para o mantine, que valida os inputs */

    const validate: FormValidateInput<FormFields> = {
        label: undefined,
        value: undefined,
        date: undefined,
        type: undefined,
        tag: undefined,
        active: undefined,
        installments: {
            current: undefined,
            total: undefined,
            dueDay: undefined
        },
        fixed: {
            dueDay: undefined
        },
    };
    // Label
    validate.label = (value) => {
        return (value.length < 2 ?
            "O nome deve ter pelo menos dois caracteres" :
            null)
    };

    // Value
    validate.value = (value) => {
        return (typeof value === "number" && !(value > 0) ?
            "O valor deve ser maior que 0" :
            !value ?
                "Por favor insira um valor" :
                null)
    };
    // Date

    validate.installments = {
        current: (value, values) => {
            return (
                values.type === "installment" ?
                    typeof value === "number" && value < 1 ?
                        "O valor mínimo é 1" :
                        value >= values.installments.total ?
                            "O valor deve ser menor que o total" :
                            typeof value === "string" ?
                                "Por favor insira um valor" : null
                    : null)
        },
        total: (value, values) => {
            return (
                values.type === "installment" ?
                    value && value < 2 ?
                        "O valor mínimo é 1" :
                        typeof value === "string" || !value ?
                            "Por favor insira um valor" :
                            null
                    : null
            )
        },
        dueDay: (value, values) => {
            return (
                values.type === "installment" ?
                    typeof value === "number" && (value < 1 || value > 31) ?
                        "O valor deve estar entre 1 e 31"
                        : null
                    : null
            )
        }
    }

    validate.fixed = {
        dueDay: (value, values) => {
            return (
                values.type == "fixed" ?
                    !value ?
                        "Por favor insira um valor" :
                        value && (value < 1 || value > 31) ?
                            "O valor deve estar entre 1 e 31" : null
                    : null
            )
        }
    }
    // Verifica se o tipo é fixo
    return validate
}

export function getTransformObject(values: FormFields): FormFields {
    /* Obtém um objeto "tranform" para o mantine, que vai transformar os itens antes depois do submit */

    let transform: FormFields = {
        ...values,
        date: values.date.toString()
    };
    if (values.type === "installment" || values.type === "monthly") {
        transform = {
            ...transform,
            fixed: {
                dueDay: 0
            }
        }
    }
    if (values.type === "fixed" || values.type === "monthly") {
        transform = {
            ...transform,
            installments: {
                current: 0,
                total: 0,
                dueDay: 0
            }
        }
    }
    if (values.tag === "") {
        transform = {
            ...transform,
            tag: "Outros"
        }
    }

    return transform
}

export function sanitizeBeforeCommiting(id: string, values: FormFields): BillsDataItemType {
    /* Adapta os itens do formulário (FormsField) para inserção no banco (BillDataItemType) */

    return ({
        id,
        label: values.label,
        tag: values.tag,
        value: values.value === "" ? 0 : values.value,
        date: values.date,
        installments: {
            current: values.installments.current === "" ? 0 : values.installments.current,
            total: values.installments.total === "" ? 0 : values.installments.total,
            dueDay: values.installments.dueDay === "" ? 0 : values.installments.dueDay,
        },
        fixed: {
            dueDay: values.fixed.dueDay === "" ? 0 : values.fixed.dueDay
        },
        type: values.type === 'fixed' ? 'fixed' : (values.type === 'installment' ? 'installment' : 'monthly'),
        note: values.note,
        active: values.active
    })
}