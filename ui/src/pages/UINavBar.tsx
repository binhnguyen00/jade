import React from "react";
import { SquarePen, Search } from "lucide-react";
import { TextInput, Code, Stack, Text, Button, HoverCard, Group, CloseButton } from "@mantine/core";

import { Conversation } from "types";

import conversations from "data/conversations.json";

interface UIConversationsProps {
  onSelect: (conversation: Conversation) => void;
}

export function UIConversations(props: UIConversationsProps) {
  const { onSelect } = props;

  const renderConversations = () => {
    const html: React.ReactNode[] = conversations.map((conversation: any) => (
      <HoverCard key={conversation.id} shadow="md" openDelay={600} withArrow position="right">
        <HoverCard.Target>
          <Button 
            onClick={() => onSelect(conversation)}
            variant="subtle" px={3}
            radius="md" justify="flex-start" color="dark.4"
          >
            <Text size="sm"> {conversation.name} </Text>
          </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown w={350}>
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
    <Stack gap="xs">
      <div>
        {renderConversations()}
      </div>
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
        <Text> Conversations </Text>
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
        leftSection={<SquarePen size={12}/>}
      > 
        New Chat 
      </Button>
      <UIConversations onSelect={onSelect}/>
    </Stack>
  )
}