import React from "react";

import { Textarea, Group, Button, Select, Container, Stack, ScrollArea, Box } from "@mantine/core";

import { Conversation } from "types";

interface UIChatBoxProps {
  conversation?: Conversation;
}

export function UIChatBox(props: UIChatBoxProps) {
  const { conversation } = props;

  return (
    <div>
      <div style={{ height: "40vh" }}/>
    </div>
  );
}
