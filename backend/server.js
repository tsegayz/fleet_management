import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js"; 

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>", 
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.error("DB connection error:", err));

const port = 5000;
app.listen(port, () => {
  console.log(`Running on port ${port}....`);
});
