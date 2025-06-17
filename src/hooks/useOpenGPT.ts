import React from "react";

import { OpenGPT } from "models";

import { useScriptTag } from "./useScriptTag";

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