import React from "react";

import { ChatGPT } from "models";

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