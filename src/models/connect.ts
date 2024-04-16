import EnvConfig from "@/utils/config";
import mongoose from "mongoose";

const connection: { connected?: number } = {};

export default async function connectDB() {
  if (connection.connected) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    const db = await mongoose.connect(EnvConfig.MONGODB_URI);
    console.log(`Connected to MongoDB: ${db.connection.host}`);
    connection.connected = db.connections[0].readyState;
  } catch (error) {
    console.log("error: ", error);
  }
}
