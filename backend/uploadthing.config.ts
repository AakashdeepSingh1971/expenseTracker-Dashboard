// backend/uploadthing.config.ts
import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  receiptUploader: f({ image: { maxFileSize: "8MB" } })
    .onUploadComplete(({ file }) => {
      console.log("✅ Upload complete:", file.url);
      return { url: file.url }; // send URL back to client
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
