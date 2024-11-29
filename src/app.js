import express from "express";
import fs from "fs/promises";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000

async function checkUploadsFolder() {
  try {
    await fs.access("./uploads");
  } catch (err) {
    await fs.mkdir("./uploads");
  }
}

import router from "./routes.js";
app.use(router);

app.listen(PORT, async () => {
  await checkUploadsFolder();
  console.log(`App listening on port ${PORT}! 🚀`);
});
