import { BillsDataItemType } from 'src/data';
import { ItemForm } from './forms.types';

export interface ModalsContextType {
	item: {
		values: ItemModal;
		open: () => void;
		close: () => void;
		toggle: () => void;
		commandForm: (fields: ItemForm) => void;
		setAction: (action: string) => void;
		setUpdateItem: (action: string) => void;
		setType: (type: string) => void;
		openUpdate: (billData: BillsDataItemType) => void;
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
	from: string | undefined;
	to: string | undefined;
};
