import React from "react";
import { SendHorizonal } from "lucide-react";

import { useForm } from "@mantine/form";
import { Button, Group, Textarea, Grid } from "@mantine/core";

import { useChat } from "hooks";
import { ChatModel, ChatResponse } from "types";

interface UIUserInputProps {
  model: ChatModel;
  onSuccessResponse: (content: string) => void;
  onSubmit: (prompt: string) => void;
}

export function UIUserInput(props: UIUserInputProps) {
  const { model, onSuccessResponse, onSubmit } = props;
  const { chat, loading } = useChat();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      prompt: "",
      model: model,
    },
    validate: {
      prompt: (value) => value.trim().length === 0 ? "Prompt is required" : null,
    },
  });

  const ask = () => {
    const { model, prompt } = form.values;
    onSubmit(prompt);
    chat({
      model: model,
      prompt: prompt,
      successCB: (response: ChatResponse) => {
        onSuccessResponse(response.message.content);
      },
      failCB: (error: any) => {
        console.error(error);
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(() => ask())}>
      <Group justify="flex-end" py="xs">
        <Textarea
          key={form.key("prompt")}
          placeholder="What's on your mind?"
          maxRows={6} autosize w="100%" inputMode="text" 
          inputContainer={
            (children: React.ReactNode) => (
              <Grid>
                <Grid.Col span={11}> {children} </Grid.Col>
                <Grid.Col span={1}> 
                  <Button type="submit" color="dark" loading={loading} loaderProps={{ type: "dots" }}>
                    <SendHorizonal />
                  </Button>
                </Grid.Col>
              </Grid>
            )
          }
          {...form.getInputProps("prompt")}
        />
      </Group>
    </form>
  )
}