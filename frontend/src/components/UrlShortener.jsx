import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function UrlShortener() {
  const [input, setInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    const res = await axios.post("https://your-backend-url.onrender.com/shorten", {
      originalUrl: input,
    });
    setShortUrl(res.data.shortUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-10">
      <motion.h1
        className="text-4xl font-bold text-blue-600"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🔗 Simple URL Shortener
      </motion.h1>
      <input
        className="w-full max-w-md p-3 border rounded-md"
        placeholder="Paste your long URL here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleShorten}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
      >
        Shorten
      </button>
      {shortUrl && (
        <motion.p
          className="text-green-600 mt-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          Shortened URL:{" "}
          <a href={shortUrl} target="_blank" className="underline">
            {shortUrl}
          </a>
        </motion.p>
      )}
    </div>
  );
}
