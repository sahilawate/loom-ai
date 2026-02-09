import { Router } from "express";
import { prisma } from "../../config/db";

const router = Router();

router.post("/create", async (_, res) => {
  const session = await prisma.session.create({
    data: { stage: "DISCOVERY" }
  });
  res.json(session);
});

export default router;
