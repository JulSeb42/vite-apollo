/*=============================================== File uploader ===============================================*/

import express, { Router } from "express"
import cors from "cors"

import { fileUploader } from "../config"
import { API_PORT } from "../utils"

const app = express()
const router = Router()

app.use(
    cors({
        credentials: true,
        origin: process.env.ORIGIN || "http://localhost:5173",
    })
)

router.put(
    "/upload-picture",
    fileUploader.single("imageUrl"),
    (req, res, next) => {
        if (!req.file) {
            next(new Error("No file uploaded"))
            return
        }

        res.json({ secure_url: req.file.path })
    }
)

app.use("/api", router)

app.listen(API_PORT, () =>
    console.log(`📥 Cloudinary API listening on port ${API_PORT}`)
)
