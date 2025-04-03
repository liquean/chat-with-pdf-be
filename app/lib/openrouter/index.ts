import APIClient from "./client";

const COMPLETION_MODEL = "openai/gpt-3.5-turbo";

export const chatCompletion = async (content: string) => {
  const body = {
    model: COMPLETION_MODEL,
    messages: [
      {
        role: "user", // For the scope of this project only 'user' role is supported
        content,
      },
    ],
  };

  return await APIClient.post("/api/v1/chat/completions", body);
};
