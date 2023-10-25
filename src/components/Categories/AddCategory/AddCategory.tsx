import { IconAdd } from '@/components/Icons';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useContext } from 'react';
import { CategoriesModalContext } from '../CategoriesActions';

export function AddCategory() {
	const categoryCtx = useContext(CategoriesModalContext);

	return (
		<Tooltip label={'Adicionar carteira'}>
			<ActionIcon
				size={'2.1rem'}
				variant={'default'}
				color={'default'}
				onClick={() => {
					categoryCtx.openModal();
				}}
			>
				<IconAdd />
			</ActionIcon>
		</Tooltip>
	);
}
