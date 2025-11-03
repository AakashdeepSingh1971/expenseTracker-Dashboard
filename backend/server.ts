import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db";
import authRoutes from "./routes/auth";
import expenseRoutes from "./routes/expenses";
import uploadthingRoutes from "./routes/uploadthing";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// ✅ UploadThing route
app.use("/api/uploadthing", uploadthingRoutes);

// ✅ Other routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// ✅ Health check
app.get("/", (_, res) => res.send("✅ Backend is running!"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
