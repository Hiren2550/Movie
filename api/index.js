import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "../api/routes/auth.route.js";
import cookieParser from "cookie-parser";
import movieRouter from "../api/routes/movie.route.js";
import path from "path";

dotenv.config();
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database Connected");
}
main().catch((err) => console.log(err));

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api", movieRouter);

app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "internal Server Error";
  return res.status(statuscode).json({ success: false, statuscode, message });
});

app.use(express.static(path.join(__dirname, "Movie/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Movie", "dist", "index.html"));
});
app.listen(3000, () => {
  console.log(`Server running at Port 3000!!`);
});
