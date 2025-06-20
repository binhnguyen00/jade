export type SuccessCB = (response: ChatResponse) => void;
export type FailCB = (response: any) => void;
export type ChatResponse = {
  message: {
    annotations: any[],
    content: string,
    role: string,
  },
}