import { RequestMethod } from "types";

export class API {
  public static baseURL: string = "http://localhost:5001";
  public static readonly Module = {
    CONVERSATION: "conversation",
  }

  public static initHeader(): Record<string, string> {
    return {
      "Content-Type": "application/json; charset=UTF-8",
    } as const;
  }

  public static async mock() {
    const input: RequestInfo = `${this.baseURL}/mock`;
    const init: RequestInit = {
      headers: this.initHeader(),
      method: RequestMethod.GET,
    }
    const response = await fetch(input, init);
    if (!response.ok) {
      throw new Error("API.ts: error fetching data");
    }
    return response.json();
  }
}
