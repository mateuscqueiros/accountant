import meta from '@/meta';
import { Badge } from '@mantine/core';

export function VersionBadge() {
	return <Badge variant="light">{meta.version}</Badge>;
}
