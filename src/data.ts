import { v4 as uuidv4 } from 'uuid';

export type UserType = {
  name: string,
  image: string,
  income: number
}

export type BillsDataItemType = {
  id: string,
  label: string,
  tags: string[],
  value: number,
  date?: Date,
  due?: number,
  totalInstallments?: number,
  currentInstallment?: number,
  note: string,
  type: "monthly" | "fixed" | "installment",
  active: boolean
}

export type BillsDataType = {
  initialMonth: Date,
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
      initialMonth: new Date("8/1/2023"),
      items: [
        {
          id: uuidv4(),
          label: "Compras necessárias",
          tags: ["Carro"],
          value: 255.6,
          date: new Date("10/08/2023"),
          note: "Compras que eu preciso fazer todo mês",
          type: "monthly",
          active: true
        },
        {
          id: uuidv4(),
          label: "Compra necessária",
          tags: ["Carro"],
          value: 255,
          date: new Date("10/08/2023"),
          note: "Compras que eu preciso fazer todo mês",
          type: "monthly",
          active: true
        },
        {
          id: uuidv4(),
          label: "Compra necessária",
          tags: ["Carro"],
          value: 255,
          date: new Date("10/08/2023"),
          note: "Compras que eu preciso fazer todo mês",
          type: "monthly",
          active: true
        },

        {
          id: uuidv4(),
          label: "Compra necessária",
          tags: ["Mercado"],
          value: 255,
          date: new Date("10/08/2023"),
          note: "Compras que eu preciso fazer todo mês",
          type: "monthly",
          active: true
        },

        {
          id: uuidv4(),
          label: "Compra necessária",
          tags: ["Mercado"],
          value: 255,
          date: new Date("10/08/2023"),
          note: "Compras que eu preciso fazer todo mês",
          type: "monthly",
          active: true
        },

        {
          id: uuidv4(),
          label: "Compra necessária",
          tags: ["Mercado"],
          value: 255,
          date: new Date("10/08/2023"),
          note: "Compras que eu preciso fazer todo mês",
          type: "monthly",
          active: true
        },
        {
          id: uuidv4(),
          label: "Compra necessária que precisei fazer esse mês não sei porque",
          tags: ["Mercado"],
          value: 255,
          date: new Date("10/08/2023"),
          note: "Compras que eu preciso fazer todo mês",
          type: "monthly",
          active: true
        },

        {
          id: uuidv4(),
          label: "Compra necessária",
          tags: ["Mercado"],
          value: 255,
          date: new Date("10/08/2023"),
          note: "Compras que eu preciso fazer todo mês",
          type: "monthly",
          active: true
        },
        {
          id: uuidv4(),
          label: "Game Pas",
          tags: ["Assinaturas"],
          value: 30,
          due: 20,
          note: "O game pass hummmm",
          type: "fixed",
          active: true
        },
        {
          id: uuidv4(),
          label: "Game Pass",
          tags: ["Assinaturas"],
          value: 30,
          due: 20,
          note: "O game pass hummmm",
          type: "fixed",
          active: true
        },
        {
          id: uuidv4(),
          label: "4090",
          tags: ["Outros"],
          value: 950,
          totalInstallments: 12,
          currentInstallment: 11,
          due: 21,
          note: "Caro pra caramba",
          type: "installment",
          active: true
        },
        {
          id: uuidv4(),
          label: "409",
          tags: ["Outros"],
          value: 950,
          totalInstallments: 12,
          currentInstallment: 11,
          due: 21,
          note: "Caro pra caramba",
          type: "installment",
          active: true
        }
      ]
    }
  ]
}

export default userData;