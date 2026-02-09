import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../../config/db";

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

router.post("/message", async (req, res) => {
  const { message, sessionId } = req.body;

  const products = await prisma.product.findMany();

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(`
You are a shopping assistant.
Available products: ${products.map(p => p.name).join(", ")}
User message: ${message}
Suggest products and explain.
  `);

  await prisma.agentEvent.create({
    data: {
      sessionId,
      agent: "SalesAgent",
      action: message
    }
  });

  res.json({ reply: result.response.text() });
});

export default router;
