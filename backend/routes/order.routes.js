import express from "express";
import { pool } from "../db/index.js";

const router = express.Router();

/**
 * Create order from cart
 */
router.post("/create", async (req, res) => {
  const { sessionId } = req.body;

  const cart = await pool.query(
    `
    SELECT v.id, v.price, c.quantity
    FROM cart_items c
    JOIN product_variants v ON v.id=c.variant_id
    WHERE c.session_id=$1
    `,
    [sessionId]
  );

  const total = cart.rows.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const order = await pool.query(
    `INSERT INTO orders(session_id, total_amount, status)
     VALUES ($1,$2,'paid')
     RETURNING *`,
    [sessionId, total]
  );

  for (const item of cart.rows) {
    await pool.query(
      `INSERT INTO order_items(order_id, variant_id, quantity, price)
       VALUES ($1,$2,$3,$4)`,
      [order.rows[0].id, item.id, item.quantity, item.price]
    );
  }

  res.json(order.rows[0]);
});

export default router;
