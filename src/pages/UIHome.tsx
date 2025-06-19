import React from "react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Title, Group, ScrollArea, Burger, Skeleton, Text, Container, Select } from "@mantine/core";

import { ChatModel } from "types";

import { UIChatBox } from "./UIChatBox";
import { UISideBar } from "./UISideBar";
import { UIUserInput } from "./UIUserInput";

export function UIHome() {
  const [ mobileOpened, { toggle: toggleMobile, close: closeMobile, open: openMobile } ] = useDisclosure();
  const [ desktopOpened, { toggle: toggleDesktop, close: closeDesktop, open: openDesktop } ] = useDisclosure(true);

  const controller = useForm({
    mode: "controlled",
    initialValues: {
      model: ChatModel.OPENAI,
    }
  })

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: "auto" }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !mobileOpened, desktop: !desktopOpened } }}
      padding="md"
    >

      <AppShell.Header>
        <Group h="100%" px="md">
          <Title> Jade </Title>
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm"/>
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm"/>
          <Select
            key={controller.key("model")}
            data={[
              { value: ChatModel.OPENAI, label: "GPT" },
              { value: ChatModel.DEEPSEEK, label: "DeepSeek" },
            ]}
            {...controller.getInputProps("model")}
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Group justify="space-between">
          <Text> Conversations </Text>
        </Group>
        {
          Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))
        }
      </AppShell.Navbar>

      <AppShell.Main style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Container w={"60%"}>
          <ScrollArea>

            <div style={{ height: "40vh" }}/>
          </ScrollArea>
        </Container>
      </AppShell.Main>

      <AppShell.Footer p="md">
        <Container w={"60%"}>
          <UIUserInput model={controller.getValues().model}/>
        </Container>
      </AppShell.Footer>

    </AppShell>
  );
}