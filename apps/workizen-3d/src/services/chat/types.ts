export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export interface ChatProvider {
  sendMessage(message: string, history: ChatMessage[]): Promise<string>;
}
