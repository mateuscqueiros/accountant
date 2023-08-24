import Layout from '@/components/Layout';
import { Button, Title } from '@mantine/core';
import Head from 'next/head';
import { useContext } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { increment, incrementByAmount, selectCount } from '@/store/features/counter/counterSlice';

export default function Home() {

    const counter = useAppSelector(selectCount);
    const dispatch = useAppDispatch();

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
                <Button onClick={() => { dispatch(incrementByAmount(5)) }}>{counter}</Button>
            </Layout>
        </>
    )
}
