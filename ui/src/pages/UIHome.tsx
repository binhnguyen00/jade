import React from "react";

import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Title, Group, Burger, Container, Select } from "@mantine/core";

import { OpenRouterFreeModel } from "types";

import { UINavBar } from "./UINavBar";
import { UIChatBox } from "./UIChatBox";

export function UIHome() {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile, open: openMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop, close: closeDesktop, open: openDesktop }] = useDisclosure(true);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      model: OpenRouterFreeModel.DEEPSEEK_R1,
      conversationId: "687f48dfaccf080c5c8871d0",
    }
  })

  const onSelectConversation = (id: string) => {
    console.log(id);
    form.setFieldValue("conversationId", id);
  }

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: "auto" }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !mobileOpened, desktop: !desktopOpened } }}
      padding="md"
    >

      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger onClick={toggleMobile} hiddenFrom="sm" size="md" />
          <Burger onClick={toggleDesktop} visibleFrom="sm" size="md" />
          <Title> Jade </Title>
          <Select
            key={form.key("model")}
            data={[
              { value: OpenRouterFreeModel.DEEPSEEK_R1, label: "DeepSeek" },
            ]}
            defaultValue={OpenRouterFreeModel.DEEPSEEK_R1}
            {...form.getInputProps("model")}
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <UINavBar onSelect={onSelectConversation} onClose={closeDesktop} />
      </AppShell.Navbar>

      <AppShell.Main style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Container w={"60%"}>
          <UIChatBox
            model={form.getValues().model}
            conversationId={form.getValues().conversationId}
          />
        </Container>
      </AppShell.Main>

    </AppShell>
  );
}