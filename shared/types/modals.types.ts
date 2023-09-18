import { BillsDataItemType } from './data.types';
import { ItemForm, TransferDataForm } from './forms.types';

export interface ModalsContextType {
	item: {
		values: ItemModal;
		open: () => void;
		close: () => void;
		toggle: () => void;
		commandForm: (fields: ItemForm) => void;
		setAction: (action: string) => void;
		setUpdateItem: (action: string) => void;
		openUpdate: (billData: BillsDataItemType) => void;
		setField: <T extends keyof ItemForm, R extends ItemForm[T]>(field: T, value: R) => void;
		reset: () => void;
	};
	transferData: {
		values: TransferDataModal;
		reset: () => void;
		open: () => void;
		close: () => void;
		setValues: (transferValues: { from: string; to: string }) => void;
	};
}

export type ItemModal = {
	opened: boolean;
	command: ItemForm;
	updateItem: string;
	action: string;
};

export type TransferDataModal = {
	opened: boolean;
	action: 'replace' | 'add';
	from: string | undefined;
	to: string | undefined;
	command: TransferDataForm;
};
