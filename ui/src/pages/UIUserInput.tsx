import React from "react";
import { SendHorizonal } from "lucide-react";

import { useForm } from "@mantine/form";
import { Button, Group, Textarea, Grid } from "@mantine/core";

import { useOpenRouter } from "hooks";
import { OpenRouterFreeModel } from "types";

interface UIUserInputProps {
  model: OpenRouterFreeModel;
  onSuccessResponse: (content: string) => void;
  onSubmit: (prompt: string) => void;
}

export function UIUserInput(props: UIUserInputProps) {
  const { model, onSuccessResponse, onSubmit } = props;
  const { chat, isPending, data } = useOpenRouter();

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

  React.useEffect(() => {
    if (!isPending) {
      if (data) {
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          onSuccessResponse(content);
        }
      }
    }
  }, [ isPending, data, onSuccessResponse ]);

  const doChat = () => {
    const { model, prompt } = form.values;
    onSubmit(prompt);
    chat({ prompt, model });
  };

  return (
    <form onSubmit={form.onSubmit(doChat)}>
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
                  <Button type="submit" color="dark" loading={isPending} loaderProps={{ type: "dots" }}>
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