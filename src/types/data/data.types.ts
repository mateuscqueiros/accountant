export interface DataContextType {
	values: UserData;

	item: {
		create: (item: Transaction) => void;
		update: (item: Transaction) => void;
		delete: (id: string) => void;
	};

	category: {
		add: ({ label, slug, color }: { label: string; slug: string; color: string }) => void;
		edit: (category: Category) => void;
		delete: (id: number) => void;
	};

	setActiveMonth: (date: string) => void;
	transferData: (transferData: TransferData) => void;
	selectActiveData: () => Transaction[];

	log: () => void;
}

export type Transaction = {
	id: string;
	/* Nome do item para ser mostrado*/
	label: string;

	/* Valor do item */
	value: number;

	/* Tipo do item */
	type: 'monthly' | 'fixed' | 'installment';

	/* Se o item é uma despesa ou receita */
	class: 'expense' | 'recipe';

	/* Date é usado para inserir o item no billData certo dele */
	date: Date;

	/* Categoria personalizada do item */
	categoryId: number;

	/* Propriedades da parcela se type == 'installment */
	installments: {
		current: number;
		total: number;
	};

	/* Dia do vencimento para parcelas e fixas */
	dueDay: number;

	/* Nota personalizada */
	note: string;

	/* Define se o sistema deve usar o item em contagens */
	active: boolean;
};

export type UserData = {
	user: User;
	activeMonth: Date;
	items: Transaction[];
};

export type User = {
	name: string;
	image: string;
	categories: Category[];
};

export type TransferData = {
	from: Date;
	to: Date;
	installments: boolean;
	fixed: boolean;
	monthly: boolean;
	transform: number;
	action: 'replace' | 'add';
};

export type Category = {
	id: number;
	label: string;
	color: string;
	slug: string;
	default?: boolean;
};