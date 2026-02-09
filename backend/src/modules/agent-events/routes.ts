import { Router } from "express";
import { prisma } from "../../config/db";

const router = Router();

router.get("/:sessionId", async (req, res) => {
  const events = await prisma.agentEvent.findMany({
    where: { sessionId: req.params.sessionId },
    orderBy: { createdAt: "asc" }
  });

  res.json(events);
});

export default router;
