import { IntegrationError } from "../errors/IntegrationError";
import getBotpressClient from "../lib/botpress";
import { chatCompletion } from "../lib/openrouter";
import { formatPassages } from "../utils";

interface Choice {
  message: { content: any };
}

export const askFile = async (query: string) => {
  try {
    // Get passages from Botpress
    const { passages } = await searchFiles(query);
    const condensedPassages = formatPassages(passages);

    // Send request to OpenRouter to get the answers from selected LLM
    const { data } = await chatCompletion(
      buildPromptWithContext(query, condensedPassages)
    );

    const messages =
      data?.choices?.map((item: Choice) => item.message.content) || [];

    return messages;
  } catch (error: any) {
    throw new IntegrationError(error.message, 422);
  }
};

const buildPromptWithContext = (query: string, passages: string) => {
  return `Taken into account this context ${passages}.
    -------------------------------------------------
    -------------------------------------------------
    Answer the following question: ${query}`;
};

const searchFiles = async (query: string) => {
  const botpressClient = getBotpressClient();
  return await botpressClient.searchFiles({ query: query });
};
