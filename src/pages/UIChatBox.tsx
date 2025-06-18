import React from "react";
import { useForm } from "@mantine/form";
import { Textarea, Group, Button, Select } from "@mantine/core";

import { useChat } from "hooks";
import { ChatModel, ChatResponse } from "types";

interface UIChatBoxProps {

}

export function UIChatBox(props: UIChatBoxProps) {
  const { chat } = useChat();
  const [ content, setContent ] = React.useState<string>("");

  const form = useForm({
    mode: "controlled",
    initialValues: {
      prompt: "",
      model: ChatModel.OPENAI,
    },
    validate: {
      prompt: (value) => value.trim().length === 0 ? "Prompt is required" : null,
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
    <div>
      <form onSubmit={form.onSubmit(() => ask())}>
        <p>
          {content}
        </p>
        <Select
          label="Model"
          key={form.key("model")}
          data={[
            { value: ChatModel.OPENAI, label: "GPT" },
            { value: ChatModel.DEEPSEEK, label: "DeepSeek" },
          ]}
          {...form.getInputProps("model")}
        />
        <Textarea
          label="Prompt"
          key={form.key("prompt")}
          autosize maxRows={10} required
          {...form.getInputProps("prompt")}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  );
}
