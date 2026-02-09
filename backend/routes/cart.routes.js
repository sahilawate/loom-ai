import express from "express";
import { pool } from "../db/index.js";

const router = express.Router();

/**
 * Add to cart
 */
router.post("/add", async (req, res) => {
  const { sessionId, variantId } = req.body;

  await pool.query(
    `INSERT INTO cart_items(session_id, variant_id, quantity)
     VALUES ($1,$2,1)
     ON CONFLICT DO NOTHING`,
    [sessionId, variantId]
  );

  res.json({ success: true });
});

/**
 * Get cart
 */
router.get("/:sessionId", async (req, res) => {
  const result = await pool.query(
    `
    SELECT 
      v.id AS variant_id,
      p.name,
      v.size,
      v.color,
      v.price,
      c.quantity
    FROM cart_items c
    JOIN product_variants v ON v.id=c.variant_id
    JOIN products p ON p.id=v.product_id
    WHERE c.session_id=$1
    `,
    [req.params.sessionId]
  );

  res.json(result.rows);
});

export default router;
