import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useContext } from 'react';
import { CategoriesModalContext } from '../CategoriesActions';

export function AddCategory() {
	const categoryCtx = useContext(CategoriesModalContext);

	return (
		<Button
			variant="subtle"
			onClick={() => categoryCtx.openModal('add')}
			mt={10}
			leftSection={<IconPlus />}
		>
			Adicionar categoria
		</Button>
	);
}
