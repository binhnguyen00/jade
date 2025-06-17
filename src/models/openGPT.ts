import { CommonModel } from "./common";

import { FailCB, SuccessCB } from "types";

export class OpenGPT extends CommonModel {
  puter: any;

  constructor(puter?: any) {
    super();
    if (puter) {
      this.puter = puter;
    } else {
      this.puter = window.puter;
    }
  }

  chat({ prompt, successCB, failCB }: {
    prompt: string,
    successCB: SuccessCB,
    failCB?: FailCB
  }) {
    this.puter.ai.chat(prompt).then((response: any) => {
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
    this.puter.ai.chat(prompt, imageUrl).then((response: any) => {
      successCB(this.parseMessage(response.message));
    }).catch((error: any) => {
      if (failCB) failCB(error);
    });
  }
}