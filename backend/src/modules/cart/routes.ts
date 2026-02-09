import { Router } from "express";
import { prisma } from "../../config/db";

const router = Router();

router.post("/add", async (req, res) => {
  const { sessionId, variantId } = req.body;

  const item = await prisma.cartItem.create({
    data: { sessionId, variantId, quantity: 1 }
  });

  res.json(item);
});

router.get("/:sessionId", async (req, res) => {
  const items = await prisma.cartItem.findMany({
    where: { sessionId: req.params.sessionId },
    include: { variant: { include: { product: true } } }
  });
  res.json(items);
});

export default router;
