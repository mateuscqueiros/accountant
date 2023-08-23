import Layout from '@/components/Layout';
import { DataContext } from '@/contexts/DataContext';
import { Flex, Group, Paper, RingProgress, SimpleGrid, Text, Title } from '@mantine/core';
import Head from 'next/head';
import { useContext } from 'react';
import FixedTable from '@/components/Tables/FixedTable';
import MonthlyTable from '@/components/Tables/MonthlyTable';
import InstallmentsTable from '@/components/Tables/InstallmentsTable';

export default function Home() {

    const { data } = useContext(DataContext);
    const { billsData } = data;

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
