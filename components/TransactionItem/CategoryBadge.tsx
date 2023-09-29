import { Category } from '@/types/Data';
import { Badge } from '@mantine/core';

export function CategoryBadge(categories: Category[], id: number) {
	return (
		<Badge variant="light">{categories.filter((category) => category.id === id)[0].label}</Badge>
	);
}
