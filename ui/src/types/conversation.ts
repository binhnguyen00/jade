export type Conversation = {
  id: number;
  name: string;
  createdAt: Date;
  messages: Message[]
}

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

export enum MessageType {
  USER      = "user",
  ASSISTANT = "assistant",
}
