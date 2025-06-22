import { RequestMethod } from "types"

export class ConversationAPI {

  public static async getById({ id }: { id: number }) {
    const input: RequestInfo = `http://localhost:5000/conversation/${id}`;
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