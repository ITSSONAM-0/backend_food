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
    "http://localhost:5175",
    "http://localhost:5176",
];

app.use(
    cors({
        origin: (origin, cb) => {
            // allow requests with no origin (e.g., curl, mobile)
            if (!origin) return cb(null, true);
            if (CLIENT_URLS.includes(origin)) return cb(null, true);
            return cb(new Error("CORS not allowed"));
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));