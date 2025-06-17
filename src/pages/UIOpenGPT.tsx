import React from "react";
import { useForm } from "@mantine/form";
import { Textarea, Group, Button } from "@mantine/core";

import { useOpenGPT } from "hooks";
import { ChatResponse } from "types";

export function UIOpenGPT() {
  const { openGPT, success } = useOpenGPT();
  const [ content, setContent ] = React.useState<string>("");
  const form = useForm({
    mode: "controlled",
    initialValues: {
      prompt: "",
    },
    validate: {
      prompt: (value) => value.trim() === "" ? "Prompt is required" : null,
    },
  })

  const ask = (prompt: string) => {
    openGPT.chat({ 
      prompt: prompt,
      successCB: (response: ChatResponse) => {
        setContent(response.message.content)
      }
    });
  }

  const askWithImage = () => {
    openGPT.chatWithImage({ 
      prompt: "tell me what is this image about?",
      imageUrl: "https://assets.puter.site/doge.jpeg",
      successCB: (response: ChatResponse) => {
        setContent(response.message.content)
      }
    });
  }

  return (
    <form onSubmit={form.onSubmit((values) => ask(values.prompt))}>
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
      <p>
        {content}
      </p>
    </form>
  );
}
