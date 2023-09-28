export interface ActiveTabContext {
	active: Tab;
	values: Tab[];
	setActive: (id: number) => void;
}

export type Tab = {
	id: number;
	label: string;
};
