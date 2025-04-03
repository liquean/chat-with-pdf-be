import { Client } from "@botpress/client";
import "dotenv/config.js";

let client: Client | undefined = undefined;

export default () => {
  if (!client) {
    const token = process.env.BOTPRESS_TOKEN;
    const workspaceId = process.env.BOTPRESS_WORKSPACE_ID;
    const botId = process.env.BOTPRESS_BOT_ID;

    client = new Client({ token, workspaceId, botId });
  }
  return client;
};
