import { Category } from '..';

export interface CategoryTabsContextType {
	active: number;
	values: Category[];
	setActive: (id: number) => void;
}

export type Tab = {
	id: number;
	label: string;
};
