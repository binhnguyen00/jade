import { useQuery } from "@tanstack/react-query";

import { Method } from "types";

export function useOpenRouter() {
  const { isPending, error, data } = useQuery({
    queryKey: [ "openRouter" ],
    queryFn: queryFn,
    retry: 3,
  })

  return { isPending, error, data }
}

async function queryFn(): Promise<any> {
  const openRouterApiKey = import.meta.env.VITE_OPEN_ROUTER_API_KEY as string;
  const input = "https://openrouter.ai/api/v1/chat/completions";
  const init: RequestInit = {
    method: Method.POST,
    headers: {
      "Authorization": `Bearer ${openRouterApiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        { role: "user", content: "Hello, how are you?" },
      ],
    }),
  }
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error("useOpenRouter.ts: error fetching data");
  }
  return response.json();
}