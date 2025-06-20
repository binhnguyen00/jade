import React from "react";
import { Search } from "lucide-react";
import { TextInput, Code, Stack, Text, Button, HoverCard } from "@mantine/core";

import { Conversation } from "types";

import conversations from "data/conversations.json";

interface UISideBarProps {
  onSelect: (conversation: Conversation) => void;
}

export function UIConversations(props: UISideBarProps) {
  const { onSelect } = props;

  const renderConversations = () => {
    const html: React.ReactNode[] = React.useMemo(() => {
      return conversations.map((conversation: any) => (
        <HoverCard key={conversation.id} shadow="md" openDelay={600} withArrow position="right">
          <HoverCard.Target>
            <Button 
              onClick={() => onSelect(conversation)}
              variant="subtle"
              px={3} radius="md" justify="flex-start" color="dark.4"
            >
              <Text size="sm"> {conversation.name} </Text>
            </Button>
          </HoverCard.Target>
          <HoverCard.Dropdown w={350}>
            <Text> {conversation.name} </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      ))
    }, [onSelect])
    
    return (
      <Stack>
        {html}
      </Stack>
    );
  }

  return (
    <Stack gap="xs">
      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={<Search size={12}/>}
        rightSectionWidth={70}
        rightSection={<Code>Ctrl + K</Code>}
        styles={{ section: { pointerEvents: 'none' } }}
      />
      <div>
        {renderConversations()}
      </div>
    </Stack>
  )
}