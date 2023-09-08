import defaultData from 'src/defaultData';
import { RootState } from '../store';

export function saveToLocalStorage(state: RootState) {
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
