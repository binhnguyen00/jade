import { RequestMethod } from "types"

import { API } from "./api";

export class ConversationAPI extends API {

  public static async getById({ id }: { id: number }) {
    const input: RequestInfo = `${this.baseURL}/${this.Module.CONVERSATION}/${id}`;
    const init: RequestInit = {
      method: RequestMethod.GET,
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await fetch(input, init);
    if (!response.ok) {
      throw new Error("ConversationAPI.ts: error fetching data");
    }
    return response.json();
  }
}