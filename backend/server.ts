// backend/server.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db";
import authRoutes from "./routes/auth";
import expenseRoutes from "./routes/expenses";

dotenv.config();
const app = express();

// ✅ Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// ✅ Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// ✅ Health check endpoint
app.get("/", (_, res) => {
  res.send("✅ Backend is running!");
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
