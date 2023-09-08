import { TransferDataModalValues } from './transferDataModal.types';

export const transferDataModalInitialValues: TransferDataModalValues = {
	opened: false,
	from: new Date().toString(),
	to: undefined,
};
