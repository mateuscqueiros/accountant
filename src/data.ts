import { format, startOfMonth } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export type UserType = {
  /* Dados do usuário */
  name: string,
  image: string,
  income: number,
  activeMonth: string
}

export type BillsDataItemType = {
  id: string,
  /* Nome do item para ser mostrado*/
  label: string,

  /* Valor do item */
  value: number,

  /* Tipo do item mensal, fixo ou parcelado */
  type: 'monthly' | 'fixed' | 'installment',

  /* Date é usado para inserir o item no billData certo dele */
  date: string,

  /* Categoria personalizada do item */
  tag: string,

  /* Propriedades da parcela se type == 'installment */
  installments: {
    current: number,
    total: number,
    dueDay: number
  },
  /* Propriedades da parcela se type == 'fixed */
  fixed: {
    dueDay: number
  },

  /* Nota personalizada */
  note: string,

  /* Define se o sistema deve usar o item em contagens */
  active: boolean
}

export type BillsDataType = {
  id: string,
  /* Mês em que os itens devem aparecer */
  initialDate: string,

  /* Itens */
  items: BillsDataItemType[]
}

export type UserDataType = {
  user: UserType,
  /* Lista de todos os meses em que houver alguma registro*/
  billsData: BillsDataType[]
}

const userData: UserDataType = {
  user: {
    name: "Mateus Queirós",
    image: "/avatar.jpg",
    income: 1200,
    activeMonth: startOfMonth(new Date()).toString()
  },
  billsData: [
    {
      id: uuidv4(),
      initialDate: startOfMonth(new Date()).toString(),
      items: [
        {
          id: uuidv4(),
          label: "Compras mensais",
          tag: "Mercado",
          value: 255.6,
          date: new Date("08/01/2023").toString(),
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
          tag: "Carro",
          value: 20,
          date: new Date("08/01/2023").toString(),
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
          tag: "Outros",
          value: 20,
          date: new Date("08/01/2023").toString(),
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
          active: false
        },
      ]
    },
    {
      id: uuidv4(),
      initialDate: startOfMonth(new Date("07/01/2023")).toString(),
      items: [
        {
          id: uuidv4(),
          label: "Compras mensais",
          tag: "Mercado",
          value: 255.6,
          date: new Date("08/01/2023").toString(),
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
      ]
    }
  ]
}

export default userData;