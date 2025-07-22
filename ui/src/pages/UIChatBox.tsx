import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { CloudAlert } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { LoadingOverlay, Stack, Box, Text, Center, Button, Group, Avatar, ScrollArea, AppShellFooter, Container } from "@mantine/core";

import { ConversationAPI } from "apis";
import { Conversation, OpenRouterFreeModel } from "types";

import { UIUserInput } from "./UIUserInput";

interface UIChatBoxProps {
  model: OpenRouterFreeModel;
  conversationId: string;
}

export function UIChatBox(props: UIChatBoxProps) {
  const { model, conversationId } = props;

  const [ tempMessages, setTempMessages ] = React.useState<any[]>([]);

  React.useEffect(() => {
    console.log("conversationId", conversationId);

    mutate();
    setTempMessages([]);
  }, [conversationId])

  const getConversation = async () => {
    const response = await ConversationAPI.getById({ id: conversationId });
    return response;
  }

  const { mutate, isPending, isError, data: response } = useMutation<{
    code: number;
    message: string;
    data: Conversation;
  }>({
    retry: false,
    mutationKey: ["conversation"],
    mutationFn: getConversation,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: Error) => {
      console.log(error);
    },
  })

  const renderMessage = (message: any) => {
    if (message.role === "user") {
      return (
        <Box key={message.id} flex={1}>
          <Group justify="flex-end" p="xs">
            <Text ff="monospace"> {message.content} </Text>
          </Group>
        </Box>
      );
    }

    return (
      <Group justify="flex-start" p="xs">
        <Avatar color="yellow" name="J" />
        <Text ff="monospace">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {message.content}
          </ReactMarkdown>
        </Text>
      </Group>
    );
  }

  if (isError) {
    return (
      <Center>
        <Button variant="transparent" leftSection={<CloudAlert />} c="red" >
          <Text fz="h3"> {"Error"} </Text>
        </Button>
      </Center>
    );
  }

  if (isPending) {
    return (
      <Box pos="relative" style={{ minHeight: "50vh" }}>
        <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      </Box>
    );
  }

  return (
    <Box pos="relative">
      <ScrollArea>
        <Stack gap={0}>
          {response?.data?.messages?.map((message: any) => (
            renderMessage(message)
          ))}
          {tempMessages?.map((message: any) => (
            renderMessage(message)
          ))}
          <div style={{ height: 500 }} />
        </Stack>
      </ScrollArea>
      
      <AppShellFooter p="lg">
        <Center>
          <div style={{ width: "60%" }}>
            <UIUserInput
              conversationId={conversationId} model={model}
              onSuccessResponse={(content: string) => {
                console.log(content);
              }}
              onSubmit={(prompt: string) => {
                console.log(prompt);
              }}
            />
          </div>
        </Center>
      </AppShellFooter>
    </Box>
  );
}
