import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  receiptUploader: f({ image: { maxFileSize: "8MB" } })
    .onUploadComplete(({ file }) => {
      console.log("✅ Uploaded file:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
