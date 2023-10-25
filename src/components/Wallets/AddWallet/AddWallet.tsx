import { ActionIcon, IconAdd } from '@/components/Icons';
import { Tooltip } from '@mantine/core';
import { useContext } from 'react';
import { WalletsModalContext } from '../WalletsActions';

export function AddWallet() {
	const walletCtx = useContext(WalletsModalContext);

	return (
		<Tooltip label={'Adicionar carteira'}>
			<ActionIcon
				size={'2.1rem'}
				variant={'default'}
				color={'default'}
				onClick={() => {
					walletCtx.openModal();
				}}
			>
				<IconAdd />
			</ActionIcon>
		</Tooltip>
	);
}
