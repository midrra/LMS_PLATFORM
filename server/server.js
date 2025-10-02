import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

// Initialize Express
const app = express();

//Connect to database
await connectDB();

// Middlewares
app.use(cors());

//Routes
app.get("/", async (req, res) => res.send("API Working"));
app.post("/clerk", express.json(), clerkWebhooks);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
