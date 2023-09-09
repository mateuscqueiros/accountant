import { ReactNode, createContext, useState } from 'react';
import {
	itemModalInitialValues,
	transferDataModalInitialValues,
} from '../../contexts/ModalsContext/modals.consts';
import { BillsDataItemType } from '../data.types';
import { ItemForm } from '../forms.types';
import { ModalsContextType } from '../modals.types';

export const ModalsContext = createContext<ModalsContextType>({} as ModalsContextType);

export default function ModalsContextProvider({ children }: { children: ReactNode }) {
	/* Item Form Modal */
	const openItem = () => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						opened: true,
					},
				},
			};
		});
	};

	const closeItem = () => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						opened: false,
					},
				},
			};
		});
	};

	const toggleItem = () => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						opened: !prev.item.values.opened,
					},
				},
			};
		});
	};

	const commandFormItem = (fields: ItemForm) => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						command: {
							...fields,
							installments: {
								...fields.installments,
							},
							fixed: {
								...fields.fixed,
							},
						},
					},
				},
			};
		});
	};

	const setActionItem = (action: string) => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						action,
					},
				},
			};
		});
	};

	const setUpdateItem = (action: string) => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						updateItem: action,
					},
				},
			};
		});
	};

	const setTypeItem = (type: string) => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						command: {
							...itemModalInitialValues.command,
							installments: {
								...itemModalInitialValues.command.installments,
							},
							fixed: {
								...itemModalInitialValues.command.fixed,
							},
							type,
						},
					},
				},
			};
		});
	};

	const openUpdateItem = (billDataItem: BillsDataItemType) => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						opened: true,
						command: {
							...billDataItem,
							installments: {
								...billDataItem.installments,
							},
							fixed: {
								...billDataItem.fixed,
							},
						},
						updateItem: billDataItem.id,
						action: 'update',
					},
				},
			};
		});
	};

	const resetItem = () => {
		setData((prev) => {
			return {
				...prev,
				item: {
					...prev.item,
					values: {
						...prev.item.values,
						opened: false,
						command: {
							...itemModalInitialValues.command,
							installments: {
								...itemModalInitialValues.command.installments,
							},
							fixed: {
								...itemModalInitialValues.command.fixed,
							},
						},
						updateItem: '',
						action: 'create',
					},
				},
			};
		});
	};

	const resetTransfer = () => {
		setData((prev) => {
			return {
				...prev,
				transferData: {
					...prev.transferData,
					values: {
						...prev.transferData.values,
						...transferDataModalInitialValues,
					},
				},
			};
		});
	};

	const openTransfer = () => {
		setData((prev) => {
			return {
				...prev,
				transferData: {
					...prev.transferData,
					values: {
						...prev.transferData.values,
						opened: true,
					},
				},
			};
		});
	};

	const closeTransfer = () => {
		setData((prev) => {
			return {
				...prev,
				transferData: {
					...prev.transferData,
					values: {
						...prev.transferData.values,
						opened: false,
					},
				},
			};
		});
	};

	const setValuesTransfer = (transferValues: { from: string; to: string }) => {
		const { from, to } = transferValues;
		setData((prev) => {
			return {
				...prev,
				transferData: {
					...prev.transferData,
					values: {
						...prev.transferData.values,
						from,
						to,
					},
				},
			};
		});
	};

	const [data, setData] = useState<ModalsContextType>({
		item: {
			values: itemModalInitialValues,
			open: openItem,
			close: closeItem,
			toggle: toggleItem,
			commandForm: commandFormItem,
			setAction: setActionItem,
			setUpdateItem: setUpdateItem,
			setType: setTypeItem,
			openUpdate: openUpdateItem,
			reset: resetItem,
		},
		transferData: {
			values: transferDataModalInitialValues,
			reset: resetTransfer,
			open: openTransfer,
			close: closeTransfer,
			setValues: setValuesTransfer,
		},
	});

	return <ModalsContext.Provider value={data}>{children}</ModalsContext.Provider>;
}
