import React from "react";
import { SquarePen, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { TextInput, Code, Stack, Text, Button, HoverCard, Group, CloseButton } from "@mantine/core";

import { Conversation } from "types";
import { ConversationAPI } from "apis";

interface UIConversationsProps {
  onSelect: (conversation: Conversation) => void;
}

export function UIConversations(props: UIConversationsProps) {
  const { onSelect } = props;

  const searchConversations = async () => {
    const response = await ConversationAPI.search({ params: { query: "" } });
    return response;
  }

  const { data: response } = useQuery<{
    code: number;
    message: string;
    data: Conversation[];
  }>({
    retry: false,
    queryKey: [ "conversations" ],
    refetchOnMount: true,
    queryFn: searchConversations,
  })

  const renderConversations = () => {
    if (!response) return null;

    const html: React.ReactNode[] = response?.data?.map((conversation: any) => (
      <HoverCard key={conversation.id} shadow="md" openDelay={1200} withArrow position="right">
        <HoverCard.Target>
          <Button 
            onClick={() => onSelect(conversation)}
            variant="subtle" px={3}
            radius="md" justify="flex-start" color="dark.4"
          >
            <Text size="sm"> {conversation.name} </Text>
          </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown w={"fit-content"}>
          <Text> {conversation.name} </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    ))

    return (
      <Stack>
        {html}
      </Stack>
    );
  }

  return (
    <Stack>
      {renderConversations()}
    </Stack>
  )
}

interface UINavBarProps {
  onSelect: (conversation: Conversation) => void;
  onClose: () => void;
}

export function UINavBar(props: UINavBarProps) {
  const { onSelect, onClose } = props;

  return (
    <Stack gap="sm">
      <Group justify="space-between">
        <Text> {"Conversations"} </Text>
        <CloseButton hiddenFrom="sm" onClick={onClose}/>
      </Group>
      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={<Search size={12}/>}
        rightSectionWidth={70}
        rightSection={<Code>Ctrl + K</Code>}
        styles={{ section: { pointerEvents: 'none' } }}
      />
      <Button 
        variant="subtle" justify="flex-start" px={3}
        leftSection={<SquarePen/>}
      > 
        <Text fw="bold"> {"New Chat"} </Text> 
      </Button>
      <UIConversations onSelect={onSelect}/>
    </Stack>
  )
}