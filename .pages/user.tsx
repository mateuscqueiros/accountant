import Layout from '@/components/Layout';
import { Box, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Head from 'next/head';
import { useCallback } from 'react';

const initialValues = {
	name: '',
};

export default function Reports() {
	const form = useForm({
		initialValues,
	});

	const handleSubmit = useCallback((values: any) => {
		console.log(values);
	}, []);

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
				<Box maw="32rem">
					<form
						onSubmit={(values) => {
							handleSubmit(values);
						}}
					>
						<Stack sx={{ gap: 0 }}>
							<Text fw="600">Nome</Text>
							<Text>Mateus Queirós</Text>
						</Stack>
						<TextInput label="Nome" placeholder="Nome" {...form.getInputProps('name')} />
					</form>
				</Box>
			</Layout>
		</>
	);
}
