import type { ChatMessage, ChatProvider } from "./types";

export class FlowiseProvider implements ChatProvider {
  constructor(
    private readonly apiUrl: string,
    private readonly chatflowId: string
  ) {}

  async sendMessage(message: string, history: ChatMessage[]): Promise<string> {
    const res = await fetch(
      `${this.apiUrl}/api/v1/prediction/${this.chatflowId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: message,
          history: history.map((m) => ({ role: m.role, content: m.text })),
        }),
        signal: AbortSignal.timeout(30_000),
      }
    );

    if (!res.ok) {
      throw new Error(`Flowise API responded with status ${res.status}`);
    }

    const data = (await res.json()) as { text?: string; answer?: string };
    return data.text ?? data.answer ?? "";
  }
}
