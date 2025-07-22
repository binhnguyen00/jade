export type Conversation = {
  id: number;
  name: string;
  messages: Message[]
}

export type Message = {
  role: "user" | "assistant";
  content: string;
}

export enum MessageType {
  USER      = "user",
  ASSISTANT = "assistant",
}