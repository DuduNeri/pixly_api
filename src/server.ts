import { config } from "dotenv";
config();

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 3333;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();
