import React from "react";
import { useMutation } from "@tanstack/react-query";

import { RequestMethod, OpenRouterFreeModel } from "types";
import { useViteKey } from "./useViteKey";

export function useOpenRouter() {
  const OPENROUTER_API_KEY = useViteKey({ key: "VITE_OPEN_ROUTER_API_KEY" }) as string;

  const mutationFn = async ({ prompt, model }: { prompt: string, model: OpenRouterFreeModel }) => {
    const input = "https://openrouter.ai/api/v1/chat/completions";
    const init: RequestInit = {
      method: RequestMethod.POST,
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "user", content: prompt },
        ],
      }),
    }
    const response = await fetch(input, init);
    if (!response.ok) {
      throw new Error("useOpenRouter.ts: error fetching data");
    }
    return response.json();
  }

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: [ "openRouter" ],
    mutationFn: mutationFn,
    retry: false,
  })

  const chat = React.useCallback((props: { prompt: string, model?: OpenRouterFreeModel }) => {
    const { prompt, model = OpenRouterFreeModel.DEEPSEEK_R1 } = props;
    mutate({ prompt, model });
  }, [ mutate ])

  return { chat, isPending, error, data }
}