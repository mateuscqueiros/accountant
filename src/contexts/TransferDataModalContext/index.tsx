import { ReactNode, createContext, useState } from 'react';
import { transferDataModalInitialValues } from './transferDataModal.consts';
import { TransferDataModalType } from './transferDataModal.types';

export const TransferDataModalContext = createContext<TransferDataModalType | null>(null);

export default function ItemFormModalContextProvider({ children }: { children: ReactNode }) {
	const resetTransferDataModal = () => {
		setData((prev) => {
			return {
				...prev,
				...transferDataModalInitialValues,
			};
		});
	};

	const openTransferDataModal = () => {
		setData((prev) => {
			return {
				...prev,
				opened: true,
			};
		});
	};

	const closeTransferDataModal = () => {
		setData((prev) => {
			return {
				...prev,
				opened: false,
			};
		});
	};

	const setTransferDataModalValues = (transferValues: { from: string; to: string }) => {
		const { from, to } = transferValues;
		setData((prev) => {
			return {
				...prev,
				from,
				to,
			};
		});
	};

	const [data, setData] = useState<TransferDataModalType>({
		...transferDataModalInitialValues,

		resetTransferDataModal,
		openTransferDataModal,
		closeTransferDataModal,
		setTransferDataModalValues,
	});

	return (
		<TransferDataModalContext.Provider value={data}>{children}</TransferDataModalContext.Provider>
	);
}
