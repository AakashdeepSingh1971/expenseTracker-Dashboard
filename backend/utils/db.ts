// backend/utils/db.ts
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    // Explicitly ensure the database is selected
    const dbName = conn.connection.name;
    console.log(`📦 Using database: ${dbName}`);

    // ✅ Force creation if it doesn't exist by creating a dummy collection
    const collections = await conn.connection.db.listCollections().toArray();
    if (collections.length === 0) {
      console.log("⚠️ No collections found. Creating default collection...");
      await conn.connection.db.createCollection("init_collection");
      console.log("✅ Default collection created — database initialized!");
    }
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
