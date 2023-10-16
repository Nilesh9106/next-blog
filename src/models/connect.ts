import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URI as string);
        console.log("mongodb connected");
    } catch (error) {
        console.log("error: ", error);
    }
}
