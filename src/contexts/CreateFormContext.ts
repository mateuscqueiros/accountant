export type FormValues = {
  label: string,
  value: number,
  date: Date,
  type: 'monthly' | 'installment' | 'fixed',
  tags: string[],
  installments: {
    current: number,
    total: number,
    dueDay: number
  },
  fixed: {
    dueDay: number
  }
}