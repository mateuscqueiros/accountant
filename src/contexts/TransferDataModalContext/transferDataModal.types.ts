export interface TransferDataModalType extends TransferDataModalValues {
	resetTransferDataModal: () => void;
	openTransferDataModal: () => void;
	closeTransferDataModal: () => void;
	setTransferDataModalValues: (transferValues: { from: string; to: string }) => void;
}

/* TransferData */
export type TransferDataType = {
	from: string;
	to: string;
	installments: boolean;
	fixed: boolean;
	monthly: boolean;
	transform: number;
	action: 'replace' | 'add';
};

export type TransferDataModalValues = {
	opened: boolean;
	from: string | undefined;
	to: string | undefined;
};

export type TransferDataFormValues = {
	date: string;
	fixed: boolean;
	installments: boolean;
	transform: number;
	monthly: boolean;
	action: string;
	opened: boolean;
};
