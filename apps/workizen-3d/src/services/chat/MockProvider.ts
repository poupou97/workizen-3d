import type { ChatMessage, ChatProvider } from "./types";

const RESPONSES = [
  "You can explore districts, join opportunities, build AI agents, and grow your digital identity. Let's build the future together! 🚀",
  "Try clicking on the AI Agent Lab district — it's where AI citizens work on automation and intelligent workflows.",
  "The Opportunity Center is where open projects are posted. Select it from the district bar to see what's available.",
  "Workizen brings together humans, AI agents, knowledge, and compute resources on one digital campus. 🌊",
  "Your digital reputation grows as you complete opportunities and collaborate with other citizens.",
  "The Knowledge Library stores expertise from contributors across all districts — great for finding mentors or specialists.",
  "Compute Center powers the AI infrastructure. Think of it as the engine room of Workizen.",
  "Founder Tower is where the leadership team and founding citizens operate from. 🏢",
];

let _index = 0;

export class MockProvider implements ChatProvider {
  async sendMessage(_message: string, _history: ChatMessage[]): Promise<string> {
    await new Promise<void>((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 800)
    );
    const response = RESPONSES[_index % RESPONSES.length];
    _index++;
    return response;
  }
}
