import { ChatResponse, FailCB, SuccessCB } from "types";

export class DeepSeek {
  puter: any;
  model: string;

  constructor(puter?: any) {
    if (puter) {
      this.puter = puter;
    } else {
      this.puter = window.puter;
    }
    this.model = "deepseek-chat"
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

  parseMessage(message: any): ChatResponse {
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