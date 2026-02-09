import { pool } from "../../db/index.js";

export async function findProducts({ category, maxPrice }) {
  const params = [category];
  let idx = 2;

  let query = `
    SELECT
      p.id,
      p.name,
      p.category,
      v.id AS variant_id,
      v.size,
      v.price,
      i.quantity,
      (
        SELECT image_url
        FROM product_images
        WHERE product_id = p.id AND is_primary = true
        LIMIT 1
      ) AS image
    FROM products p
    JOIN product_variants v ON v.product_id = p.id
    JOIN inventory i ON i.variant_id = v.id
    WHERE p.is_active = true
      AND i.quantity > 0
      AND p.category = $1
  `;

  // 🔒 STRICT price enforcement
  if (maxPrice !== null) {
    query += ` AND v.price <= $${idx}`;
    params.push(maxPrice);
    idx++;
  }

  query += `
    ORDER BY v.price ASC
    LIMIT 8
  `;

  const { rows } = await pool.query(query, params);
  return rows;
}
