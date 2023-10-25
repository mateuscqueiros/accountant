import { Wallet } from '@/types/data';
import { WalletForm } from '@/types/forms';

export function getWalletById(id: number, wallets: Wallet[]): Wallet {
	return wallets.filter((wallet) => wallet.id === id)[0];
}

export function getWalletsForm(wallets: Wallet[], id?: number): WalletForm[] {
	if (id !== undefined) {
		let foundWallet = getWalletById(id, wallets);
		if (foundWallet) {
			return [
				{
					id: foundWallet.id,
					value: String(foundWallet.id),
					slug: foundWallet.label.toLocaleLowerCase(),
					label: foundWallet.label,
					default: foundWallet.default ? true : false,
				},
			];
		} else return [];
	}
	return wallets.map((wallet) => {
		return {
			id: wallet.id,
			value: String(wallet.id),
			slug: wallet.label.toLocaleLowerCase(),
			label: wallet.label,
			default: wallet.default ? true : false,
		};
	});
}

export function sortWallets(wallets: Wallet[]) {
	return wallets.sort((a, b) => {
		if (a.default) {
			return 1;
		}
		return a.label.localeCompare(b.label);
	});
}

export function getNextWalletId(wallets: Wallet[]): number {
	const nextId = Math.max(...wallets.map((item) => item.id)) + 1;
	return nextId;
}

export function getDefaultWallet(wallets: Wallet[]): Wallet {
	const defaultWallet = wallets.filter((wallet) => {
		return wallet.default === true;
	})[0];

	return defaultWallet;
}
