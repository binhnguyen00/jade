import React from "react";

import { DeepSeek } from "models";

import { useScriptTag } from "./useScriptTag";

export function useDeepSeek() {
  const { success, error } = useScriptTag("https://js.puter.com/v2/");
  const [ deepSeek, setDeepSeek ] = React.useState<DeepSeek>(new DeepSeek());

  React.useEffect(() => {
    if (success) {
      setDeepSeek(new DeepSeek(window.puter));
    } else {
      setDeepSeek(new DeepSeek());
    }
  }, [ success, window.puter ]);

  return { deepSeek, success, error };
}
