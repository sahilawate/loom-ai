import { Router } from "express";
import { prisma } from "../../config/db";

const router = Router();

router.get("/", async (_, res) => {
  const products = await prisma.product.findMany({
    include: { variants: true }
  });
  res.json(products);
});

export default router;
