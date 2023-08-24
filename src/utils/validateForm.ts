import { IForm } from "@/store/features/form/formSlice";
import * as Yup from "yup";

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
            then: (schema) => schema.typeError("Por favor insira um valor")
                .min(1, "O valor mínimo é 1"),
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

export type FormErrorType = {
    message: string,
    field: string
}

export default function validateForm(obj: IForm): FormErrorType[] {
    let errors = [];
    // Label
    if (obj.label.length < 2) {
        errors.push({
            message: "O nome deve ter mais de dois caracteres",
            field: "label"
        })
    }
    // Value
    if (!obj.value) {
        errors.push({
            message: "Por favor insira um valor",
            field: "value"
        })
    }
    if (typeof obj.value === "number" && obj.value < 0.0000001) {
        errors.push({
            message: "O valor deve ser maior que 1",
            field: "value"
        })
    }
    // Date
    if (!obj.date.length && obj.type != "installment" && obj.type != "fixed") {
        errors.push({
            message: "Por favor insira um valor",
            field: "date"
        })
    }

    // Verifica se o tipo é uma parcela
    if (obj.type == "installment") {
        // Installments current
        if (!(obj.installments.current < obj.installments.total)) {
            errors.push({
                message: "O valor é maior ou igual ao total",
                field: "installments.current"
            })
        }
        if (typeof obj.installments.current === "string") {
            errors.push({
                message: "Por favor insira um valor",
                field: "installments.current"
            })
        }
        if (typeof obj.installments.current === "number" && obj.installments.current < 1) {
            errors.push({
                message: "O valor mínimo é 1",
                field: "installments.current"
            })
        }

        // Installments total
        if (typeof obj.installments.total === "string") {
            errors.push({
                message: "Por favor insira um valor",
                field: "installments.total"
            })
        }
        if (!obj.installments.total) {
            errors.push({
                message: "Por favor insira um valor",
                field: "installments.total"
            })
        }
        if (obj.installments.total && obj.installments.total < 2) {
            errors.push({
                message: "O valor mínimo é 2",
                field: "installments.total"
            })
        }

        // Installments dueDay
        if (typeof obj.installments.dueDay === "number" && (obj.installments.dueDay < 1 || obj.installments.dueDay > 31)) {
            errors.push({
                message: "O valor deve estar entre 1 e 31",
                field: "installments.dueDay"
            })
        }
    }
    // Verifica se o tipo é fixo
    if (obj.type == "fixed") {
        if (!obj.fixed.dueDay) {
            errors.push({
                message: "Por favor insira um valor",
                field: "fixed.dueDay"
            })
        }
        if (obj.fixed.dueDay && (obj.fixed.dueDay < 1 || obj.fixed.dueDay > 31)) {
            errors.push({
                message: "O valor deve estar entre 1 e 31",
                field: "fixed.dueDay"
            })
        }
    }
    console.log(errors)

    return errors
}

export function transformForm(obj: IForm): IForm {
    if (obj.type === "installment" || obj.type === "fixed") {
        obj.date = "";
    }
    if (obj.type === "installment" || obj.type === "monthly") {
        obj.fixed.dueDay = "";
    }
    if (obj.type === "fixed" || obj.type === "monthly") {
        obj.installments.current = "";
        obj.installments.total = "";
        obj.installments.dueDay = "";
    }
    if (obj.tags.length === 0) {
        obj.tags.push("Outros");
    }

    return obj
}