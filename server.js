import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";

dotenv.config();
connectDB();

const app = express();

const CLIENT_URLS = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5174",
  "https://frontend-food-seven.vercel.app"
];

app.use(
  cors({
    origin: CLIENT_URLS,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

export default app;
