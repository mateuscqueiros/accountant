import classes from '@/styles/NothingFoundBackground.module.css';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { Illustration404 } from 'public/404';

export default function NothingFoundBackground() {
	return (
		<Container className={classes.root}>
			<div className={classes.inner}>
				<Illustration404 className={classes.image} />
				<div className={classes.content}>
					<Title className={classes.title}>Nada pra ver aqui</Title>
					<Text c="dimmed" size="lg" ta="center" className={classes.description}>
						A página que você tentou acessar não existe. Você pode ter digitado o endereço errado ou
						a página foi movida para outro lugar.
					</Text>
					<Group justify="center">
						<Link href="/">
							<Button size="md">Voltar para a Home</Button>
						</Link>
					</Group>
				</div>
			</div>
		</Container>
	);
}
