import express from "express";
import { pool } from "../db/index.js";

const router = express.Router();

router.get("/:sessionId", async (req, res) => {
  const result = await pool.query(
    `
    SELECT agent_name, action, metadata, created_at
    FROM agent_events
    WHERE session_id=$1
    ORDER BY created_at
    `,
    [req.params.sessionId]
  );

  res.json(result.rows);
});

export default router;
