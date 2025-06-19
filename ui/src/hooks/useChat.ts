import React from "react";
import { ChatModel, ChatResponse, FailCB, SuccessCB } from "types";

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
  const [ loading, setLoading ] = React.useState(false);

  const { deepSeek } = useDeepSeek();
  const { openGPT } = useOpenGPT();

  const chat = ({ model, prompt, successCB, failCB }: ChatProps) => {
    const success: SuccessCB = (response: ChatResponse) => {
      setLoading(false);
      successCB(response);
    }

    const fail: FailCB = (error: any) => {
      setLoading(false);
      if (failCB) failCB(error);
    }
    
    try {
      setLoading(true);
      switch (model) {
        case (ChatModel.OPENAI):
          openGPT.chat({ prompt, successCB: success, failCB: fail });
          break;
        case (ChatModel.DEEPSEEK):
          deepSeek.chat({ prompt, successCB: success, failCB: fail });
          break;
        default:
          console.error("Invalid AI Model");
          break;
      }
    } catch (error) {
      setLoading(false);
      if (failCB) failCB(error);
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

  return { chat, chatWithImage, loading };
}