import React from "react";

import { SuccessCB, FailCB } from "types";

import { useScriptTag } from "./useScriptTag";

export class OpenGPT {
  puter: any;

  constructor(puter?: any) {
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
      successCB({
        message: {
          annotations: [],
          content: response.message?.content,
          role: response.message?.role,
        }
      });
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
      successCB({
        message: {
          annotations: [],
          content: response.message?.content,
          role: response.message?.role,
        }
      });
    }).catch((error: any) => {
      if (failCB) failCB(error);
    });
  }
}

export function useOpenGPT() {
  const { success, error } = useScriptTag("https://js.puter.com/v2/");
  const [ openGPT, setOpenGPT ] = React.useState<OpenGPT>(new OpenGPT());

  React.useEffect(() => {
    if (success) {
      setOpenGPT(new OpenGPT(window.puter));
    } else {
      setOpenGPT(new OpenGPT());
    }
  }, [ success, window.puter ]);

  return { openGPT, success, error };
}