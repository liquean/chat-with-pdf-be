import { Router, Request, Response } from "express";
import { askFile } from "../middleware/promptManager";
import { RouterError } from "../errors/RouterError";

export = (() => {
  const router = Router();

  /**
   * Get LLM completion with context given a query
   * @route {GET} /prompt
   * @returns LLM messages
   */
  router.get("/", async (req: Request, res: Response) => {
    const query = req.query.query as string;

    if (!query) {
      throw new RouterError("Query can't be empty", 400);
    }

    const messages = await askFile(query);

    res.send({ messages });
  });

  return router;
})();
