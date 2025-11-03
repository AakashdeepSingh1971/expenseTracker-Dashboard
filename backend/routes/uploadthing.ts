import express from "express";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "../uploadthing.config";

const router = express.Router();

// This mounts the UploadThing handler correctly
router.all(
    "*",
    createRouteHandler({
        router: uploadRouter,
    })
);

export default router;
