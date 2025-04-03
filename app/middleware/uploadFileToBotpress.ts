import { IntegrationError } from "../errors/IntegrationError";
import getBotpressClient from "../lib/botpress";
import { wait } from "../utils";

const botpressClient = getBotpressClient();
const STATUSES_READY = ["indexing_completed", "upload_completed"];
const STATUSES_FAILED = ["upload_failed", "indexing_failed"];
const FINISHED_STATUSES = [...STATUSES_FAILED, ...STATUSES_READY];

export const getFileReady = async (name: string, data: Buffer) => {
  try {
    let result;

    // Upload file to Botpress cloud
    let { file } = await uploadFile(name, data);

    let isFileUploaded = STATUSES_READY.includes(file.status);

    // Polling until file processing finish
    while (!isFileUploaded) {
      await wait();
      const { file: checkedFile } = await getFile(file.id);
      const { status } = checkedFile;
      result = checkedFile;
      isFileUploaded = FINISHED_STATUSES.includes(status);
    }

    if (STATUSES_FAILED.includes(file.status)) {
      throw new Error("Uploading document failed. Try again.");
    }

    return result;
  } catch (error: any) {
    throw new IntegrationError(error.message, 422);
  }
};

const getFile = async (id: string) => {
  const file = await botpressClient.getFile({ id });
  return file;
};

const uploadFile = async (name: string, data: Buffer) => {
  const fileResponse = await botpressClient.uploadFile({
    key: name,
    content: data,
    index: true,
  });

  return fileResponse;
};
