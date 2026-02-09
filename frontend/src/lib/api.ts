const API = "http://localhost:4000/api";

export async function post(path: string, body: any) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function get(path: string) {
  const res = await fetch(`${API}${path}`);
  return res.json();
}
