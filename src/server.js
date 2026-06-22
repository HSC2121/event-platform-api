import app from "./app.js";
import { config } from "./config/env.config.js";
import { connectDB } from "./config/database.config.js";

connectDB();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});