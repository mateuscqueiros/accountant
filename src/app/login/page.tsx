'use client';

import { IconFacebook, IconGithub, IconGoogle } from '@/components/Icons/Brand';
import {
	ActionIcon,
	Button,
	Card,
	Divider,
	Flex,
	Group,
	PasswordInput,
	Text,
	TextInput,
	Title,
	rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';

export default function Login() {
	const loginForm = useForm({
		initialValues: {
			user: '',
			password: '',
		},
		validate: {
			user: (value) => (value === '' ? 'Insira um usuário ou email' : null),
			password: (value) => (value === '' ? 'Insira sua senha' : null),
		},
	});

	return (
		<Flex align="center" justify="center" h="100%">
			<Card
				shadow="lg"
				radius="md"
				p="xl"
				m="30"
				h="fit-content"
				w="100%"
				maw={rem(400)}
				mah={rem(900)}
			>
				<Title fz="2rem" order={1}>
					Login
				</Title>
				<form onSubmit={loginForm.onSubmit((values) => console.log(values))}>
					<TextInput
						mt={10}
						label="Usuário"
						placeholder="Usuário ou email"
						{...loginForm.getInputProps('user')}
					/>
					<PasswordInput
						mt={10}
						label="Senha"
						placeholder="Senha"
						{...loginForm.getInputProps('password')}
					/>
					<Group justify="flex-end" mt="md">
						<Button w="100%" type="submit">
							Enviar
						</Button>
					</Group>
				</form>
				<Divider label="Fazer login com um serviço" my="md" />
				<Flex justify="center" w="100%">
					<Group>
						<ActionIcon size="2.5rem" radius="xl" variant="outline">
							<IconGoogle />
						</ActionIcon>
						<ActionIcon size="2.5rem" radius="xl" variant="outline">
							<IconGithub />
						</ActionIcon>
						<ActionIcon size="2.5rem" radius="xl" variant="outline">
							<IconFacebook />
						</ActionIcon>
					</Group>
				</Flex>
				<Flex justify="center" mt="md">
					<Text fz="sm">
						Novo por aqui? <Link href="/signup">Cadastrar-se</Link>
					</Text>
				</Flex>
			</Card>
		</Flex>
	);
}
