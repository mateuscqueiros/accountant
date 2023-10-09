"use client";

import {
  ActionIcon,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./ToggleTheme.module.css";

export const ToggleTheme = () => {
  const { toggleColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  useHotkeys([["ctrl+j", () => toggleColorScheme()]]);

  return (
    <Tooltip
      label={computedColorScheme === "dark" ? "Tema claro" : "Tema escuro"}
    >
      <ActionIcon
        size="2.1rem"
        variant="default"
        onClick={() => toggleColorScheme()}
      >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
};
