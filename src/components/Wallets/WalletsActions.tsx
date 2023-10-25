import { sortWallets } from '@/lib/wallets';
import { DataContext } from '@/providers/DataProvider';
import { Wallet } from '@/types/data';
import { WalletForm } from '@/types/forms';
import {
	Box,
	Button,
	Checkbox,
	Group,
	Modal,
	SimpleGrid,
	Stack,
	Text,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { WalletItem } from '.';

interface WalletsModalContext {
	openModal: (action?: WalletsModalContext['action']) => void;
	closeModal: () => void;
	reset: () => void;
	setValues: (wallet: Wallet) => void;
	opened: boolean;
	action: 'edit' | 'add';
	values: Wallet;
}

export const WalletsModalContext = createContext<WalletsModalContext>({} as WalletsModalContext);

export function WalletsModalProviders({ children }: PropsWithChildren) {
	const openModal = (action?: WalletsModalContext['action']) => {
		setData((prev) => {
			return {
				...prev,
				opened: true,
				action: action || 'add',
			};
		});
	};

	const closeModal = () => {
		setData((prev) => {
			return {
				...prev,
				opened: false,
			};
		});
	};

	const setValues = (wallet: Wallet) => {
		setData((prev) => {
			return {
				...prev,
				values: wallet,
			};
		});
	};

	const reset = () => {
		setData((prev) => {
			return {
				...prev,
				action: 'add',
				values: {
					id: -1,
					label: '',
					slug: '',
				},
			};
		});
	};

	const [data, setData] = useState<WalletsModalContext>({
		openModal,
		closeModal,
		setValues,
		reset,
		opened: false,
		action: 'edit',
		values: {
			id: -1,
			label: '',
			slug: '',
		},
	});

	return <WalletsModalContext.Provider value={data}>{children}</WalletsModalContext.Provider>;
}

export function WalletModal() {
	const walletCtx = useContext(WalletsModalContext);
	const data = useContext(DataContext);

	const form = useForm<WalletForm>({
		initialValues: {
			id: -1,
			slug: '',
			label: '',
			default: false,
			value: '',
		},
		validate: {
			label: (value) => (value.length < 2 ? 'O nome deve ter mais de 2 caracteres' : null),
		},
		transformValues: (values) => ({
			...values,
			slug: values.label.toLowerCase(),
		}),
	});

	useEffect(() => {
		if (walletCtx.opened) {
			form.setValues(walletCtx.values);
		} else {
			form.reset();
		}
	}, [walletCtx]);

	const handleSubmit = (values: WalletForm) => {
		if (walletCtx.action === 'add') {
			data.wallet.add(values);
		} else if (walletCtx.action === 'edit') {
			data.wallet.edit(values);
		}
	};

	return (
		<Modal
			title={walletCtx.action === 'edit' ? 'Editar carteira' : 'Criar carteira'}
			opened={walletCtx.opened}
			onClose={() => {
				walletCtx.closeModal();
				walletCtx.reset();
				form.reset();
			}}
		>
			<form
				onSubmit={form.onSubmit((values) => {
					walletCtx.closeModal();
					walletCtx.reset();
					handleSubmit(values);
				})}
			>
				<Stack>
					{form.values.default && (
						<Text fz="sm">
							Esta é a carteira padrão. Quando outras carteiras são deletadas seus itens são
							transferidos para ela.
						</Text>
					)}
					<TextInput placeholder="Digite um nome" label="Nome" {...form.getInputProps('label')} />
					<Group gap="xs">
						<Tooltip
							multiline
							maw={300}
							label="A carteira padrão receberá os itens que não tiverem uma carteira especificada na criação ou os itens de uma carteira deletada."
						>
							<Checkbox label="Padrão" {...form.getInputProps('default', { type: 'checkbox' })} />
						</Tooltip>
					</Group>
				</Stack>
				<Group mt="lg" justify="flex-end">
					<Button
						variant="outline"
						onClick={() => {
							walletCtx.closeModal();
							form.reset();
						}}
					>
						Cancelar
					</Button>
					<Button type="submit">Salvar</Button>
				</Group>
			</form>
		</Modal>
	);
}

export function WalletsActions() {
	const data = useContext(DataContext);
	const walletsModalCtx = useContext(WalletsModalContext);

	let sortedWallets = sortWallets(data.values.user.wallets);

	return (
		<>
			<SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} w="100%">
				{sortedWallets.map((wallet) => (
					<Box
						key={wallet.label + wallet.id}
						onClick={(e) => {
							e.stopPropagation();
							walletsModalCtx.openModal('edit');
							walletsModalCtx.setValues(wallet);
						}}
					>
						<WalletItem wallet={wallet} />
					</Box>
				))}
			</SimpleGrid>
			<WalletModal />
		</>
	);
}
