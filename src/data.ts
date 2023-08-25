import { v4 as uuidv4 } from 'uuid';

export type UserType = {
  name: string,
  image: string,
  income: number
}

export type BillsDataItemType = {
  id: string,
  label: string,
  value: number,
  type: string,
  date: string,
  installments: {
    current: number,
    total: number,
    dueDay: number
  },
  fixed: {
    dueDay: number
  },
  tags: string[],
  note: string,
  active: boolean
}

export type BillsDataType = {
  initialDate: string,
  items: BillsDataItemType[]
}

export type UserDataType = {
  user: UserType,
  billsData: BillsDataType[]
}

const userData: UserDataType = {
  user: {
    name: "Mateus Queirós",
    image: "/avatar.jpg",
    income: 12000
  },
  billsData: [
    {
      initialDate: new Date("8/1/2023").toString(),
      items: [
        {
          id: uuidv4(),
          label: "Compras mensais",
          tags: ["Mercado", "Carro", "Outros"],
          value: 255.6,
          date: new Date("01/01/2023").toString(),
          type: "monthly",
          installments: {
            current: 0,
            total: 0,
            dueDay: 0
          },
          fixed: {
            dueDay: 0
          },
          note: "Uma nota que ninguém vai ler",
          active: true
        },
        {
          id: uuidv4(),
          label: "Compras fixas",
          tags: ["Mercado", "Carro", "Outros"],
          value: 20,
          date: new Date("01/01/2023").toString(),
          type: "fixed",
          installments: {
            current: 0,
            total: 0,
            dueDay: 0
          },
          fixed: {
            dueDay: 12
          },
          note: "Uma nota que ninguém vai ler",
          active: true
        },
        {
          id: uuidv4(),
          label: "Compras parceladas",
          tags: ["Mercado", "Carro", "Assinaturas", "Outros"],
          value: 20,
          date: new Date("01/01/2023").toString(),
          type: "installment",
          installments: {
            current: 10,
            total: 12,
            dueDay: 10
          },
          fixed: {
            dueDay: 12
          },
          note: "Uma nota que ninguém vai ler",
          active: true
        },
      ]
    }
  ]
}

export default userData;