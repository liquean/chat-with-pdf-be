import { Router, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { getFileReady } from "../middleware/uploadFileToBotpress";
import { RouterError } from "../errors/RouterError";

export = (() => {
  const router = Router();

  /**
   * Upload file
   * @route {POST} /files
   * @returns file object
   */
  router.post("/", async (req: Request, res: Response) => {
    const file = req.files?.file as UploadedFile;

    if (!file) {
      throw new RouterError("File must exists", 400);
    }

    const fileRes = await getFileReady(file.name, file.data);

    res.send(fileRes);
  });

  return router;
})();
