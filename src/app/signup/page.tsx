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

export default function Signup() {
	const signupForm = useForm({
		initialValues: {
			user: '',
			password: '',
			confirmPassword: '',
		},
		validate: {
			user: (value) => (value === '' ? 'Insira um usuário ou email' : null),
			password: (value) => (value === '' ? 'Insira uma senha' : null),
			confirmPassword: (_, values) =>
				values.password === values.confirmPassword ? 'As senhas não coincidem' : null,
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
					Cadastro
				</Title>
				<form onSubmit={signupForm.onSubmit((values) => console.log(values))}>
					<TextInput
						mt={10}
						label="Usuário"
						placeholder="Usuário ou email"
						{...signupForm.getInputProps('user')}
					/>
					<PasswordInput
						mt={10}
						label="Senha"
						placeholder="Senha"
						{...signupForm.getInputProps('password')}
					/>
					<PasswordInput
						mt={10}
						label="Confirmar senha"
						placeholder="Confirme"
						{...signupForm.getInputProps('confirmPassword')}
					/>
					<Group justify="flex-end" mt="md">
						<Button w="100%" type="submit">
							Submit
						</Button>
					</Group>
				</form>
				<Divider label="Cadastrar-se com um serviço" my="md" />
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
						Já é um usuário? <Link href="/login">Login</Link>
					</Text>
				</Flex>
			</Card>
		</Flex>
	);
}
