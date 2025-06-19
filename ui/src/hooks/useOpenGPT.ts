import React from "react";

import { ChatResponse, FailCB, PuterAPI, SuccessCB, SupportModels } from "types";

import { useScriptTag } from "./useScriptTag";

export function useOpenGPT() {
  const { success, error } = useScriptTag("https://js.puter.com/v2/");
  const [ openGPT, setOpenGPT ] = React.useState<ChatGPT>(new ChatGPT());

  React.useEffect(() => {
    if (success) {
      setOpenGPT(new ChatGPT(window.puter));
    } else {
      setOpenGPT(new ChatGPT());
    }
  }, [ success, window.puter ]);

  return { openGPT, success, error };
}

class ChatGPT {
  private puter: PuterAPI;
  private model: SupportModels;

  constructor(puter?: PuterAPI) {
    if (puter) {
      this.puter = puter;
    } else {
      this.puter = window.puter;
    }
    this.model = "gpt-4o-mini"
  }

  chat({ prompt, successCB, failCB }: {
    prompt: string,
    successCB: SuccessCB,
    failCB?: FailCB
  }) {
    this.puter.ai.chat(prompt, { model: this.model }).then((response: any) => {
      successCB(this.parseMessage(response.message));
    }).catch((error: any) => {
      if (failCB) failCB(error);
    });
  }

  chatWithImage({ prompt, imageUrl, successCB, failCB }: { 
    prompt: string, 
    imageUrl: string, 
    successCB: SuccessCB, 
    failCB?: FailCB 
  }) {
    this.puter.ai.chat(prompt, { model: this.model }, imageUrl).then((response: any) => {
      successCB(this.parseMessage(response.message));
    }).catch((error: any) => {
      if (failCB) failCB(error);
    });
  }

  private parseMessage(message: any): ChatResponse {
    let messageResponse = {
      annotations: [],
      content: "",
      role: "",
    };

    if (message) {
      messageResponse = {
        annotations: message?.annotations,
        content: message?.content,
        role: message?.role,
      };
    }
    
    return {
      message: messageResponse
    } as ChatResponse;
  }
}