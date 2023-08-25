import Layout from '@/components/Layout';
import { Button, Flex, Group, Paper, RingProgress, SimpleGrid, Text, Title } from '@mantine/core';
import Head from 'next/head';
import FixedTable from '@/components/Tables/FixedTable';
import MonthlyTable from '@/components/Tables/MonthlyTable';
import InstallmentsTable from '@/components/Tables/InstallmentsTable';
import AddBill from '@/components/Layout/Components/AddBill';
import userData from "data";
import { format, getTags } from '@/utils/index';
import { createItem, selectActiveBillsItem, selectData, updateItem } from '@/store/features/data/dataSlice';
import { useAppDispatch, useAppSelector } from '@/store/index';

export default function Home() {

  const activeData = useAppSelector(selectActiveBillsItem);
  const data = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  let tags = getTags(activeData.items);
  let expensestotal = activeData.items.reduce((partialSum, a) => partialSum + a.value, 0);

  return (
    <>
      <Head>
        <title>Contas</title>
        <meta name="description" content="Aplicação para gerenciar contas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex justify="space-between">
          <Title order={1} mb="1rem">Bem-vindo, {data.user.name.split(" ")[0]}!</Title>
          <AddBill tags={tags} />
        </Flex>
        <Paper mb="1rem" p="1rem" px="2rem">
          <Title order={2}>{format(new Date(activeData.initialDate), "MMMM' de 'yyyy")}</Title>
          <Flex justify="space-between">
            <Flex direction="column" justify="center" sx={{ gap: 0 }}>
              <Group sx={{ gap: 0 }}>
                <Text mr={10}>Saldo mensal:</Text>
                <Text fw={600}>${(data.user.income - expensestotal).toFixed(2)}</Text>
              </Group>
              <Group sx={{ gap: 0 }}>
                <Text mr={10}>Total de gastos:</Text>
                <Text fw={600}>${expensestotal.toFixed(2)}</Text>
              </Group>
            </Flex>
            <RingProgress sections={[
              { value: 40, color: 'cyan' },
              { value: 15, color: 'orange' },
              { value: 15, color: 'grape' },
            ]} />
          </Flex>
        </Paper>
        <SimpleGrid
          breakpoints={[
            { minWidth: 0, cols: 1 },
            { minWidth: 1000, cols: 2 },
            { minWidth: 1300, cols: 3 },
            { minWidth: 1700, cols: 4 },
          ]}
        >
          <FixedTable data={activeData.items} header={["Nome", "Valor", "Vencimento"]} />
          <InstallmentsTable data={activeData.items} header={["Nome", "Valor", "Parcela", "Vencimento"]} />
          <MonthlyTable data={activeData.items} header={["Nome", "Valor", "Dia"]} />
        </SimpleGrid>
      </Layout>
    </>
  )
}
