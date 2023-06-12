import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from "../routes/recipes.routes.js";
import authRoutes from "../routes/auth.routes.js";
import userRoutes from "../routes/user.routes.js";
import postRoutes from "../routes/post.routes.js";
import stripeRoutes from "../routes/stripe.Routes.js";
import exerciceRoutes from "../routes/exercicie.routes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import PostExercicesRoutes from "../routes/postExercices.routes.js";

/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: "Authorization",
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

dotenv.config();
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`server port : ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
  });

/* Rutas */

app.use("/api/recipes", router);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/exercices", exerciceRoutes);
app.use("/api/postExercices", PostExercicesRoutes);

export default app;
