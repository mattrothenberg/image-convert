import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import sharp from "sharp";

import * as middlewares from "./middlewares";
import api from "./api";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
	const url = req.query.url as string;
	if (!url) {
		return res.status(400).json({ error: "Missing required parameter `url`" });
	}

	const imageResponse = await fetch(url);
	// get buffer
	const imageBuffer = await imageResponse.arrayBuffer();

	// read image URL with sharp
	sharp(imageBuffer)
		.toBuffer()
		.then((data) => {
			res.set("Content-Type", "image/jpeg");
			res.send(data);
		})
		.catch((err) => {
			console.error(err);
			res.status(400).json({ error: "Invalid image URL" });
		});
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
