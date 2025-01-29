import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { createClerkClient } from "@clerk/backend";

// Load the backend environment file
dotenv.config({ path: "backend/.env.server" });

const app = express();
const PORT = process.env.PORT || 3000;

// Check if environment variables are loaded correctly
if (!process.env.CLERK_SECRET_KEY || !process.env.CLERK_PUBLISHABLE_KEY) {
  console.error("❌ Missing Clerk API keys! Check your .env.server file.");
  process.exit(1);
}

// Initialize Clerk Client
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Example route to fetch user details from Clerk Backend API
app.get("/api/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user from Clerk
    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user.id,
      username: user.username || user.fullName || "Anonymous",
      profileImage: user.imageUrl,
    });
  } catch (error) {
    console.error("Error fetching user from Clerk:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});