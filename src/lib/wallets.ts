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
					value: String(foundWallet.id),
					label: foundWallet.label,
				},
			];
		} else return [];
	}
	return wallets.map((wallet) => {
		return {
			value: String(wallet.id),
			label: wallet.label,
		};
	});
}

export function sortWallets(categories: Wallet[]) {
	return categories.sort((a, b) => {
		if (a.default) {
			return 1;
		}
		return a.label.localeCompare(b.label);
	});
}
