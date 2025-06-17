export interface PuterAPI {
  ai: {
    chat: (prompt: string, imageUrl?: string) => Promise<string>;
  };
  print: (message: string) => void;
}