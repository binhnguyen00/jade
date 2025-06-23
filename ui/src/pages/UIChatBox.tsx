import React from "react";
import { CloudAlert } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Paper, LoadingOverlay, Stack, Box, Text, Center, Button } from "@mantine/core";

import { Conversation } from "types";
import { ConversationAPI } from "apis";

interface UIChatBoxProps {
  conversationId: string;
  currentPrompt?: string;
  currentResponse?: string;
}

export function UIChatBox(props: UIChatBoxProps) {
  const { conversationId, currentPrompt, currentResponse } = props;

  const [ tempMessages, setTempMessages ] = React.useState<any[]>([]);

  React.useEffect(() => {
    const newMessages = [];

    if (currentPrompt) {
      newMessages.push({
        id: `prompt-${Date.now()}`,
        role: "user",
        content: currentPrompt
      });
    }
    
    if (currentResponse) {
      newMessages.push({
        id: `response-${Date.now()}`,
        role: "assistant",
        content: currentResponse
      });
    }

    if (newMessages.length > 0) {
      setTempMessages(newMessages);
    }
  }, [ currentPrompt, currentResponse ])

  React.useEffect(() => {
    mutate();
  }, [ conversationId ])

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
    mutationKey: [ "conversation" ],
    mutationFn: getConversation,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: Error) => {
      console.log(error);
    },
  })

  if (isError) {
    return (
      <Center>
        <Button variant="transparent" leftSection={<CloudAlert/>} c="red" > 
          <Text fz="h3"> {"Error"} </Text>
        </Button>
      </Center>
    );
  }

  if (isPending) {
    return (
      <Box pos="relative" style={{ minHeight: "50vh" }}>
        <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }}/>
      </Box>
    );
  }

  return (
    <Box pos="relative">
      <Stack>
        {response?.data?.messages?.map((message: any) => (
          <Paper key={message.id}>
            <Text> {message.content} </Text>
          </Paper>
        ))}
        {tempMessages?.map((message: any) => (
          <Paper key={message.id}>
            <Text> {message.content} </Text>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
