import React from "react";
import { useForm } from "@mantine/form";
import { Textarea, Group, Button, Select, Container } from "@mantine/core";

import { ChatResponse } from "types";
import { useDeepSeek, useOpenGPT } from "hooks";

export function UIChatBox() {
  const { openGPT } = useOpenGPT();
  const { deepSeek } = useDeepSeek();
  const [ content, setContent ] = React.useState<string>("");

  const form = useForm({
    mode: "controlled",
    initialValues: {
      prompt: "",
      model: "openai",
    },
    validate: {
      prompt: (value) => value.trim() === "" ? "Prompt is required" : null,
    },
  })

  const ask = () => {
    const { model, prompt } = form.values;
    if (model === "openai") {
      openGPT.chat({ 
        prompt: prompt,
        successCB: (response: ChatResponse) => {
          setContent(response.message.content)
        }
      });
    } else {
      deepSeek.chat({ 
        prompt: prompt,
        successCB: (response: ChatResponse) => {
          setContent(response.message.content)
        }
      });
    }
  }

  return (
    <Container p="xs" fluid>
      <form onSubmit={form.onSubmit(() => ask())}>
        <p>
          {content}
        </p>
        <Select
          label="Pick a Model"
          key={form.key("model")}
          data={["openai", "deepseek-chat"]}
          {...form.getInputProps("model")}
        />
        <Textarea
          label="Prompt"
          autosize maxRows={10}
          key={form.key("prompt")}
          required
          {...form.getInputProps("prompt")}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Container>
  );
}
