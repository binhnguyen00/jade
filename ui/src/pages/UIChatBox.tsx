import React from "react";
import { CloudAlert } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Paper, LoadingOverlay, Stack, Box, Text, Center, Button } from "@mantine/core";

import { Conversation } from "types";
import { ConversationAPI } from "apis";

interface UIChatBoxProps {
  conversationId: number;
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

    console.log(newMessages);
  }, [ currentPrompt, currentResponse ])

  React.useEffect(() => {
    mutate();
  }, [ conversationId ])

  const mutationFn = async (id: number) => {
    const conversation = await ConversationAPI.getById({ id });
    return conversation;
  }

  const { mutate, isPending, isError, data } = useMutation<Conversation>({
    retry: false,
    mutationKey: [ "conversation" ],
    mutationFn: () => mutationFn(conversationId),
    onSuccess: (data: Conversation) => {
      console.log(data);
    },
    onError: (error: Error) => {
      console.log(error);
    },
  })

  // if (isError) {
  //   return (
  //     <Center>
  //       <Button variant="transparent" leftSection={<CloudAlert/>} c="red" > 
  //         <Text fz="h3"> {"Error"} </Text>
  //       </Button>
  //     </Center>
  //   );
  // }

  return (
    <Box pos="relative" style={{ height: 500 }}>
      <Stack>
        {data?.messages.map((message: any) => (
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
      <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }}/>
    </Box>
  );
}
