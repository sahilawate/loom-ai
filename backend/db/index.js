import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "loom_ai",
  password: "admin_sa",
  port: 5432,
});
