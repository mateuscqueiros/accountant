import defaultData from '@/shared/defaultData';
import { DataContextType } from '@/shared/types/data.types';

export function saveToLocalStorage(state: DataContextType) {
	try {
		const serialisedState = JSON.stringify(state);
		localStorage.setItem('accountant-data', serialisedState);
	} catch (e) {
		console.warn(e);
	}
}

export function loadFromLocalStorage() {
	try {
		const serialisedState = localStorage.getItem('accountant-data');
		if (serialisedState === null) return defaultData;
		return JSON.parse(serialisedState);
	} catch (e) {
		console.warn(e);
		return defaultData;
	}
}
