export interface CategoryTabsContextType {
	active: number;
	setActive: (id: number) => void;
}

export type Tab = {
	id: number;
	label: string;
};
