import React from "react";

import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Title, Group, Burger, Container, Select } from "@mantine/core";

import { ChatModel } from "types";
import { useOpenRouter } from "hooks";

import { UIChatBox } from "./UIChatBox";
import { UIUserInput } from "./UIUserInput";
import { UINavBar } from "./UINavBar";

export function UIHome() {
  const { data } = useOpenRouter();

  React.useEffect(() => {
    console.log(data);
  }, [ data ])

  const [ mobileOpened, { toggle: toggleMobile, close: closeMobile, open: openMobile } ] = useDisclosure();
  const [ desktopOpened, { toggle: toggleDesktop, close: closeDesktop, open: openDesktop } ] = useDisclosure(true);

  const controller = useForm({
    mode: "controlled",
    initialValues: {
      model : ChatModel.OPENAI,
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
              { value: ChatModel.OPENAI, label: "GPT" },
              { value: ChatModel.DEEPSEEK, label: "DeepSeek" },
            ]}
            defaultValue={ChatModel.OPENAI}
            value={controller.getInputProps("model").value}
            onChange={controller.getInputProps("model").onChange}
            onBlur={controller.getInputProps("model").onBlur}
            onFocus={controller.getInputProps("model").onFocus}
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <UINavBar
          onSelect={(conversation: any) => console.log(conversation)} 
          onClose={closeDesktop}
        />
      </AppShell.Navbar>

      <AppShell.Main style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Container w={"60%"}>
          <UIChatBox
            />
        </Container>
      </AppShell.Main>

      <AppShell.Footer p="md">
        <Container w={"60%"}>
          <UIUserInput 
            model={controller.getValues().model}
            onSubmit={(prompt: string) => console.log(prompt)}
            onSuccessResponse={(content: string) => console.log(content)}
          />
        </Container>
      </AppShell.Footer>

    </AppShell>
  );
}