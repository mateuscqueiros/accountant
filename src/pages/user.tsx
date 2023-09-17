import Layout from '@/components/Layout';
import { Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Head from 'next/head';

const initialValues = {
	name: '',
};

export default function Reports() {
	const form = useForm({
		initialValues,
	});

	return (
		<>
			<Head>
				<title>Contas</title>
				<meta name="description" content="Aplicação para gerenciar contas" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<Title order={1} mb="1rem">
					Usuário
				</Title>
			</Layout>
		</>
	);
}
