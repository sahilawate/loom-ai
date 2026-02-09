const API_BASE = "http://localhost:4000";

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
}
