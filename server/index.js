import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging Middleware
app.use((req, res, next) => {
  console.log(`📡 ${req.method} request to ${req.url}`);
  next();
});

// 1. ADDED: Root Route (Fixes the 404 on http://localhost:5000/)
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "AI Roadmap Server is running!",
    endpoints: {
      health: "/health",
      generate: "/api/generate-roadmap"
    }
  });
});

// 2. ADDED: Favicon Fix (Prevents browser noise in logs)
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// Routes
app.use("/api", aiRoutes);

// Catch-all for actual 404s (Must be the LAST route)
app.use((req, res) => {
  console.log(`❌ 404 Error: Route ${req.originalUrl} not found`);
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Root URL: http://localhost:${PORT}/`);
});