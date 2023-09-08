import { BillsDataItemType } from '../DataContext/dataContext.types';
import { ItemFormType } from '../ItemFormContext/itemForm.types';

export interface ItemFormModalContextType extends IFormModalType {
	open: () => void;
	close: () => void;
	toggle: () => void;
	commandForm: (fields: ItemFormType) => void;
	setAction: (action: string) => void;
	setUpdateItem: (action: string) => void;
	setType: (type: string) => void;
	openUpdate: (billData: BillsDataItemType) => void;
	reset: () => void;
}

/* Item Form Modal Types */
export type IFormModalType = {
	opened: boolean;
	command: ItemFormType;
	updateItem: string;
	action: string;
};
