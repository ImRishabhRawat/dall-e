import express from "express";
import * as dotenv from "dotenv";
// import { Configuration, OpenAIApi} from "openai"
import OpenAI from "openai";


dotenv.config();

const router = express.Router();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
    res.send("Hello from DALL-E")
});

router.route('/').post(async (req, res) => { 
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({
					model: "dall-e-3",
					prompt,
					n: 1,
					size: "1024x1024",
					response_format: "b64_json",
				});

        image = response.data.data[0].url;
        res.status(200).json({photo: image});
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})

export default router;