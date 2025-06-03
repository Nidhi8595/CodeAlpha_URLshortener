// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { nanoid } = require("nanoid");
const Url = require("./models/Url");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

// POST /shorten
app.post("/shorten", async (req, res) => {
    const { originalUrl } = req.body;
    const shortId = nanoid(6);

    const newUrl = new Url({ originalUrl, shortId });
    await newUrl.save();

    res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
});

// GET /:shortId
app.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;
    const record = await Url.findOne({ shortId });

    if (record) return res.redirect(record.originalUrl);
    res.status(404).send("URL not found");
});

app.listen(5000, () => {
    console.log("Server started on http://localhost:5000");
});
