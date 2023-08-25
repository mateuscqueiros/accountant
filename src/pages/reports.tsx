import Layout from '@/components/Layout';
import { Button, Title } from '@mantine/core';
import Head from 'next/head';
import { useContext } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function Home() {

    return (
        <>
            <Head>
                <title>Contas</title>
                <meta name="description" content="Aplicação para gerenciar contas" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Title order={1} mb="1rem">Relatórios</Title>
            </Layout>
        </>
    )
}
