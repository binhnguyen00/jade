import React from "react";

import { Paper } from "@mantine/core";

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
