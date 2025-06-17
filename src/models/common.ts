import { ChatResponse } from "types";

export class CommonModel { 
  
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