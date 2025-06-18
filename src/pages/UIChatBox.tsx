import React from "react";
import { useForm } from "@mantine/form";
import { Textarea, Group, Button, Select, Container } from "@mantine/core";

import { useChat } from "hooks";
import { ChatModel, ChatResponse } from "types";

export function UIChatBox() {
  const { chat } = useChat();
  const [ content, setContent ] = React.useState<string>("");

  const form = useForm({
    mode: "controlled",
    initialValues: {
      prompt: "",
      model: ChatModel.OPENAI,
    },
    validate: {
      prompt: (value) => value.trim() === "" ? "Prompt is required" : null,
    },
  })

  const ask = () => {
    const { model, prompt } = form.values;
    chat({
      model: model,
      prompt: prompt,
      successCB: (response: ChatResponse) => {
        setContent(response.message.content)
      },
      failCB: (error: any) => {
        console.error(error);
      },
    })
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
          data={[ChatModel.OPENAI, ChatModel.DEEPSEEK]}
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
