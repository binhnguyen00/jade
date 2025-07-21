import React from "react";

import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Title, Group, Burger, Container, Select } from "@mantine/core";

import { OpenRouterFreeModel } from "types";

import { UINavBar } from "./UINavBar";
import { UIChatBox } from "./UIChatBox";
import { UIUserInput } from "./UIUserInput";

export function UIHome() {
  const [ mobileOpened, { toggle: toggleMobile, close: closeMobile, open: openMobile } ] = useDisclosure();
  const [ desktopOpened, { toggle: toggleDesktop, close: closeDesktop, open: openDesktop } ] = useDisclosure(true);

  const controller = useForm({
    mode: "uncontrolled",
    initialValues: {
      model: OpenRouterFreeModel.DEEPSEEK_R1,
      currentConversationId: "6858d9f6599090d43e751be7",
      currentPrompt: "",
      currentResponse: "",
    }
  })


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
          <Burger onClick={toggleMobile} hiddenFrom="sm" size="md"/>
          <Burger onClick={toggleDesktop} visibleFrom="sm" size="md"/>
          <Title> Jade </Title>
          <Select
            key={controller.key("model")}
            data={[
              { value: OpenRouterFreeModel.DEEPSEEK_R1, label: "DeepSeek" },
            ]}
            defaultValue={OpenRouterFreeModel.DEEPSEEK_R1}
            value={controller.getInputProps("model").value}
            onChange={controller.getInputProps("model").onChange}
            onBlur={controller.getInputProps("model").onBlur}
            onFocus={controller.getInputProps("model").onFocus}
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <UINavBar
          onSelect={(conversation: any) => controller.setFieldValue("currentConversationId", conversation.id)} 
          onClose={closeDesktop}
        />
      </AppShell.Navbar>

      <AppShell.Main style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Container w={"60%"}>
          <UIChatBox 
            conversationId={controller.getValues().currentConversationId}
            currentPrompt={controller.getValues().currentPrompt}
            currentResponse={controller.getValues().currentResponse}
          />
        </Container>
      </AppShell.Main>

      <AppShell.Footer p="md">
        <Container w={"60%"}>
          <UIUserInput 
            model={controller.getValues().model}
            onSubmit={(prompt: string) => {
              console.log(prompt);
              controller.setFieldValue("currentPrompt", prompt);
            }}
            onSuccessResponse={(content: string) => controller.setFieldValue("currentResponse", content)}
          />
        </Container>
      </AppShell.Footer>

    </AppShell>
  );
}