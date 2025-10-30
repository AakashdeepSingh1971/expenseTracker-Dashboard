// Minimal UploadThing server config. You must install and configure UploadThing per their docs.
import { createUploadthing, type FileRouter } from 'uploadthing/server';

const f = createUploadthing();

export const uploadRouter = {
  // endpoint name 'receiptUploader' used by frontend UploadButton(endpoint='receiptUploader')
  receiptUploader: f({ image: { maxFileSize: '5MB' } })
    .onUploadComplete(({ file }) => {
      console.log('UploadThing: file uploaded', file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
