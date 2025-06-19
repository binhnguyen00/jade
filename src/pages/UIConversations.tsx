import React from "react";
import { Search } from "lucide-react";
import { TextInput, Code, Stack, Text, Button } from "@mantine/core";

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
        <Button 
          key={conversation.id} 
          onClick={() => onSelect(conversation)}
          variant="subtle"
          px={3} radius="md" justify="flex-start" color="dark.4"
        >
          <Text size="sm"> {conversation.name} </Text>
        </Button>
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