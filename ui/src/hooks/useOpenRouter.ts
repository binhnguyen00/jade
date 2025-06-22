import { useMutation } from "@tanstack/react-query";

import { RequestMethod, OpenRouterFreeModel } from "types";
import { useViteKey } from "./useViteKey";

export function useOpenRouter() {
  const { mutate, isPending, error, data } = useMutation({
    mutationKey: [ "openRouter" ],
    mutationFn: mutationFn,
    retry: false,
  })

  return { trigger: mutate, isPending, error, data }
}

async function mutationFn({ prompt, model }: {
  prompt: string,
  model: OpenRouterFreeModel,
}): Promise<any> {
  const openRouterApiKey = useViteKey({ key: "VITE_OPEN_ROUTER_API_KEY" }) as string;
  
  const input = "https://openrouter.ai/api/v1/chat/completions";
  const init: RequestInit = {
    method: RequestMethod.POST,
    headers: {
      "Authorization": `Bearer ${openRouterApiKey}`,
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