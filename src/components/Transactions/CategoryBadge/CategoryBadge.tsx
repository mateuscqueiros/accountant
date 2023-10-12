import { Category } from '@/types/Data';
import { Badge, parseThemeColor, useMantineTheme } from '@mantine/core';

interface CategoryBadgeProps {
	category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
	const theme = useMantineTheme();
	const categoryColor = parseThemeColor({ color: category.color, theme }).color;

	return (
		<Badge variant="light" color={categoryColor}>
			{category.label}
		</Badge>
	);
}
