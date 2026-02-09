import express from "express";
import cors from "cors";

import agentEventRoutes from "./modules/agent-events/routes";
import sessionRoutes from "./modules/session/routes";
import productRoutes from "./modules/product/routes";
import cartRoutes from "./modules/cart/routes";
import aiRoutes from "./modules/ai/routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/agent-events", agentEventRoutes);
app.use("/session", sessionRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/ai", aiRoutes);

export default app;
