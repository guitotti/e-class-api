import express from "express";
import fs from "fs/promises";
const app = express();
app.use(express.json());

async function checkUploadsFolder() {
  try {
    await fs.access("./uploads");
  } catch (err) {
    await fs.mkdir("./uploads");
  }
}

import router from "./routes.js";
app.use(router);

app.listen(3000, async () => {
  await checkUploadsFolder();
  console.log("App listening on port 3000! 🚀");
});
