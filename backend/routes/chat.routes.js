import express from "express";
import { runAI } from "../services/ai/orchestrator.js";
import { pool } from "../db/index.js";

const router = express.Router();

router.post("/message", async (req, res) => {
  const { sessionId, message } = req.body;

  const history = await pool.query(
    `SELECT COUNT(*) FROM chat_messages WHERE session_id=$1`,
    [sessionId]
  );

  const isFirstMessage = Number(history.rows[0].count) === 0;

  if (message) {
    await pool.query(
      `INSERT INTO chat_messages(session_id, role, content)
       VALUES ($1,'user',$2)`,
      [sessionId, message]
    );
  }

  const ai = await runAI(sessionId, message, isFirstMessage);

  await pool.query(
    `INSERT INTO chat_messages(session_id, role, content)
     VALUES ($1,'assistant',$2)`,
    [sessionId, ai.reply]
  );

  res.json(ai);
});

export default router;
