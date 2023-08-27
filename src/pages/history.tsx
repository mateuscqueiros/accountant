import Layout from '@/components/Layout'
import { Title } from '@mantine/core'
import Head from 'next/head'

export default function History() {

    return (
        <>
            <Head>
                <title>Contas</title>
                <meta name="description" content="Aplicação para gerenciar contas" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Title order={1} mb="1rem">Hitórico das contas</Title>

            </Layout>
        </>
    )
}
