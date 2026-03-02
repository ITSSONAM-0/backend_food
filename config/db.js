import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri || uri.includes("YOUR_MONGODB")) {
            console.error(
                "❌ MONGO_URI is not set or still a placeholder. Set a valid MongoDB connection string in .env (starts with mongodb:// or mongodb+srv://)."
            );
            console.error("→ Example (local): MONGO_URI=mongodb://localhost:27017/restro-db");
            console.error(
                "→ Example (Atlas): mongodb+srv://<user>:<pass>@cluster0.xyz.mongodb.net/myDB?retryWrites=true&w=majority"
            );
            // Don't exit the process here — allow server to start for development/testing.
            return;
        }

        await mongoose.connect(uri);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Error connecting MongoDB:", error.message);
        console.error("Stack:", error.stack);
        // Do not exit automatically; leave decision to caller. This allows the server to run for debugging.
    }
};

export default connectDB;