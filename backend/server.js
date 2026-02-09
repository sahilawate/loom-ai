import express from "express";
import cors from "cors";

import sessionRoutes from "./routes/session.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import agentRoutes from "./routes/agent.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/session", sessionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/agents", agentRoutes);

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
