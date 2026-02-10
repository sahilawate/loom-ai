// backend/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";

// Import Routes
import sessionRoutes from "./routes/session.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import agentRoutes from "./routes/agent.routes.js";

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/session", sessionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/agents", agentRoutes);

// Health Check
app.get("/", (req, res) => res.send("Backend is running!"));

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});