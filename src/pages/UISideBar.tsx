import React from "react";

import { Search } from "lucide-react";
import { TextInput, Code } from "@mantine/core";

interface UISideBarProps {

}

export function UISideBar(props: UISideBarProps) {
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
    </div>
  )
}