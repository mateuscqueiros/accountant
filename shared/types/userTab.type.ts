export interface ActiveTabContextType {
	active: TabType;
	values: TabType[];
	setActive: (id: number) => void;
}

export type TabType = {
	id: number;
	label: string;
};
