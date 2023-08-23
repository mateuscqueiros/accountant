import Layout from '@/components/Layout';
import { Flex, Group, Paper, RingProgress, SimpleGrid, Text, Title } from '@mantine/core';
import Head from 'next/head';
import { useState } from 'react';
import FixedTable from '@/components/Tables/FixedTable';
import MonthlyTable from '@/components/Tables/MonthlyTable';
import InstallmentsTable from '@/components/Tables/InstallmentsTable';
import AddBill from '@/components/Layout/Components/AddBill';
import { useDisclosure } from '@mantine/hooks';
import { FormValues } from '@/contexts/CreateFormContext';
import userData from "data";
import { v4 as uuidv4 } from 'uuid';
import { format, getTags } from '@/utils/index';

export default function Home() {

  const [allData, setAllData] = useState(userData);
  const [activeData, setActiveData] = useState(userData.billsData[0]);
  const [expensestotal, setExpensestotal] = useState<number>(activeData.items.reduce((partialSum, a) => partialSum + a.value, 0));
  const [tags, setTags] = useState(getTags(activeData.items));

  const [openedModal, actionsModal] = useDisclosure(false);

  const [formValues, setFormValues] = useState<FormValues>({
    label: '',
    value: 0,
    date: new Date("1/1/2023"),
    type: 'monthly',
    tags: ["Outro"],
    installments: {
      current: 1,
      total: 2,
      dueDay: 1
    },
    fixed: {
      dueDay: 1
    }
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
        <Flex justify="space-between">
          <Title order={1} mb="1rem">Bem-vindo, {allData.user.name.split(" ")[0]}!</Title>
          <AddBill values={formValues} tags={tags} setTags={setTags} state={openedModal} actions={actionsModal} setValues={setFormValues} />
        </Flex>
        <Paper mb="1rem" p="1rem" px="2rem">
          <Title order={2}>{format(activeData.initialMonth, "MMMM' de 'yyyy")}</Title>
          <Flex justify="space-between">
            <Flex direction="column" justify="center" sx={{ gap: 0 }}>
              <Group sx={{ gap: 0 }}>
                <Text mr={10}>Saldo mensal:</Text>
                <Text fw={600}>${(allData.user.income - expensestotal).toFixed(2)}</Text>
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
          <FixedTable data={activeData.items} setForm={setFormValues} header={["Nome", "Valor", "Data"]} action={actionsModal} />
          <InstallmentsTable data={activeData.items} setForm={setFormValues} header={["Nome", "Valor", "Parcela", "Prazo"]} action={actionsModal} />
          <MonthlyTable data={activeData.items} setForm={setFormValues} header={["Nome", "Valor", "Data"]} action={actionsModal} />
        </SimpleGrid>
      </Layout>
    </>
  )
}
