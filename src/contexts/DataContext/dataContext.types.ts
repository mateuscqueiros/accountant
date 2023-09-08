import { TransferDataType } from '../TransferDataModalContext/transferDataModal.types';

export interface DataContextType extends UserDataType {
	/* Data functions */
	createItem: (item: BillsDataItemType) => void;
	updateItem: (item: BillsDataItemType) => void;
	deleteItem: (id: string) => void;
	setActiveMonth: (date: string) => void;
	transferData: (transferData: TransferDataType) => void;
}

/* Data */
export type BillsDataItemType = {
	id: string;
	/* Nome do item para ser mostrado*/
	label: string;

	/* Valor do item */
	value: number;

	/* Tipo do item */
	type: 'monthly' | 'fixed' | 'installment';

	/* Date é usado para inserir o item no billData certo dele */
	date: string;

	/* Categoria personalizada do item */
	tag: string;

	/* Propriedades da parcela se type == 'installment */
	installments: {
		current: number;
		total: number;
		dueDay: number;
	};
	/* Propriedades da parcela se type == 'fixed */
	fixed: {
		dueDay: number;
	};

	/* Nota personalizada */
	note: string;

	/* Define se o sistema deve usar o item em contagens */
	active: boolean;
};

export type UserDataType = {
	user: UserType;
	/* Itens */
	items: BillsDataItemType[];
};

export type UserType = {
	/* Dados do usuário */
	name: string;
	image: string;
	income: number;
	activeMonth: string;
};
