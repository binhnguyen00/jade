import React from "react";

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

  chat({ prompt }: {
    prompt: string
  }) {
    this.puter.ai.chat(prompt).then((response: any) => {
      console.log(response);
    });
  }

  chatWithImage({ prompt, imageUrl }: { 
    prompt: string, imageUrl: string 
  }) {
    this.puter.ai.chat(prompt, imageUrl).then((response: any) => {
      console.log(response);
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
      setOpenGPT(window.puter as any);
    }
  }, [ success, window.puter ]);

  return { openGPT, success, error };
}