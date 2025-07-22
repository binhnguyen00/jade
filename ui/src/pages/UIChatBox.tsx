import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { v4 as uuid } from "uuid";
import { CloudAlert } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { 
  LoadingOverlay, Stack, Box, Text, Center,
  Button, Group, Avatar, ScrollArea, AppShellFooter,
} from "@mantine/core";

import { ConversationAPI } from "apis";
import { Conversation, Message, OpenRouterFreeModel, ServerResponse } from "types";

import { UIUserInput } from "./UIUserInput";

interface UIChatBoxProps {
  model: OpenRouterFreeModel;
  conversationId: string;
}

export function UIChatBox(props: UIChatBoxProps) {
  const { model, conversationId } = props;

  React.useEffect(() => {
    mutate();
  }, [ conversationId ])

  const { mutate, isPending, isError, data } = useMutation<ServerResponse<Conversation>>({
    retry: false,
    mutationKey: ["conversation"],
    mutationFn: async () => {
      const response = await ConversationAPI.getById({ id: conversationId });
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: Error) => {
      console.log(error);
    },
  })

  const renderMessages = () => {
    if (!data) return null;
    if (!data.data) return null;
    if (!data.data.messages) return null;

    const messages: React.ReactNode[] = data.data.messages.map((message: Message) => {
      if (message.role === "user") {
        return (
          <Box key={uuid()} flex={1}>
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
    });
    
    return messages
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
          {renderMessages()}
          <div style={{ height: 500 }} />
        </Stack>
      </ScrollArea>
      
      <AppShellFooter p="lg">
        <Center>
          <div style={{ width: "60%" }}>
            <UIUserInput
              conversationId={conversationId} model={model}
              onBotResponse={(content: string) => {
                console.log(content);
              }}
              onUserEnter={(prompt: string) => {
                console.log(prompt);
              }}
            />
          </div>
        </Center>
      </AppShellFooter>
    </Box>
  );
}