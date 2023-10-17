import { defaultData as dataInitialValues } from '@/consts/data';
import { UserData } from '@/types/data';
import { useState } from 'react';
import useLocalStorage from 'use-local-storage-state';

export function useData() {
	if (process.env.STORAGE_TYPE === 'state') {
		return useState<UserData>(dataInitialValues);
	} else if (process.env.STORAGE_TYPE === 'local-storage') {
		return useLocalStorage<UserData>('accountant-data', {
			defaultValue: dataInitialValues,
		});
	}
}
