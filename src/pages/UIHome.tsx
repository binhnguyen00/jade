import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Title, Group, ScrollArea, CloseButton, Burger } from "@mantine/core";

import { UIChatBox } from "./UIChatBox";
import { UISideBar } from "./UISideBar";

export function UIHome() {
  const [ desktopOpened, { toggle: toggleDesktop } ] = useDisclosure(true);

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "xs",
        collapsed: { desktop: !desktopOpened },
      }}
      padding="xs"
    >

      <AppShell.Navbar p="xs">
        <AppShell.Section w="100%">
          <Group justify="space-between">
            <Title>Jade</Title>
            <CloseButton onClick={toggleDesktop} size="lg" hidden={desktopOpened}/>
          </Group>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <UISideBar/>
        </AppShell.Section>
        <AppShell.Section>
          Development
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <AppShell.Section>
          <Burger opened={desktopOpened} onClick={toggleDesktop} hidden={desktopOpened}/>
        </AppShell.Section>
        <AppShell.Section>
          <UIChatBox/>
        </AppShell.Section>
      </AppShell.Main>

    </AppShell>
  )
}