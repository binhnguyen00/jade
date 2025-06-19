import React from "react";

import { Search } from "lucide-react";
import { TextInput, Code, Skeleton } from "@mantine/core";

interface UISideBarProps {

}

export function UIConversations(props: UISideBarProps) {
  return (
    <div>
      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={<Search size={12}/>}
        rightSectionWidth={70}
        rightSection={<Code>Ctrl + K</Code>}
        styles={{ section: { pointerEvents: 'none' } }}
        mb="sm"
      />
      <div>
        {Array(15).fill(0).map((number, index) => <Skeleton key={index} h={30} mt="sm" animate/>)}
      </div>
    </div>
  )
}