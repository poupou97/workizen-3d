import { FlowiseProvider } from "./FlowiseProvider";
import { MockProvider } from "./MockProvider";
import type { ChatProvider } from "./types";

export function createChatProvider(): ChatProvider {
  const apiUrl = process.env.NEXT_PUBLIC_FLOWISE_API_URL;
  const chatflowId = process.env.NEXT_PUBLIC_FLOWISE_CHATFLOW_ID;

  if (apiUrl && chatflowId) {
    return new FlowiseProvider(apiUrl, chatflowId);
  }

  return new MockProvider();
}

export type { ChatProvider };
