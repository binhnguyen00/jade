import { ChatModel, FailCB, SuccessCB } from "types";

import { useDeepSeek } from "./useDeepSeek";
import { useOpenGPT } from "./useOpenGPT";

interface ChatProps {
  model     : ChatModel;
  prompt    : string;
  imageUrl? : string;
  successCB : SuccessCB;
  failCB?   : FailCB;
}

export function useChat() {
  const { deepSeek } = useDeepSeek();
  const { openGPT } = useOpenGPT();

  const chat = ({ model, prompt, successCB, failCB }: ChatProps) => {
    switch (model) {
      case (ChatModel.OPENAI):
        openGPT.chat({ prompt, successCB, failCB });
        break;
      case (ChatModel.DEEPSEEK):
        deepSeek.chat({ prompt, successCB, failCB });
        break;
      default:
        console.error("Invalid AI Model");
        break;
    }
  }

  /** only GPT support computer vision */
  const chatWithImage = ({ model, prompt, imageUrl, successCB, failCB }: ChatProps) => {
    if (!imageUrl) {
      console.error("Image URL is required");
      return;
    }
    switch (model) {
      case (ChatModel.OPENAI):
        openGPT.chatWithImage({ prompt, imageUrl, successCB, failCB });
        break;
      default:
        console.error("Invalid AI Model");
        break;
    }
  }

  return { chat, chatWithImage };
}