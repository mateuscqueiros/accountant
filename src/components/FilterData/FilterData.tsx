import { Menu } from '@mantine/core';
import { useState } from 'react';
import { ActionIcon, IconFilter } from '../Icons';
import { FilterDataMenu } from './FilterDataModal';

export function FilterData() {
	const [modalOpen, setModalOpen] = useState(false);

	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};

	return (
		<Menu shadow="md" width={200} closeOnItemClick={false}>
			<Menu.Target>
				<ActionIcon onClick={() => toggleModal()}>
					<IconFilter size="1.2rem" />
				</ActionIcon>
			</Menu.Target>

			<FilterDataMenu state={modalOpen} setOpened={toggleModal} />
		</Menu>
	);
}
