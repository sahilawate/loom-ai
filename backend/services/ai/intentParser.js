import fetch from "node-fetch";

const SYSTEM_PROMPT = `
You are an AI shopping assistant for a fashion store.

Your job:
- Understand what the user wants
- Extract structured constraints
- Do NOT recommend products yourself
- Return ONLY JSON

Supported categories:
shirt, tshirt, jeans, blazer, dress

Supported sizes:
S, M, L

Output JSON format:
{
  "category": string | null,
  "maxPrice": number | null,
  "size": "S" | "M" | "L" | null,
  "intent": "browse" | "buy" | "question",
  "confidence": "high" | "medium" | "low"
}
`;

export async function parseIntent(message) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: SYSTEM_PROMPT + `\nUser: "${message}"` }]
          }
        ]
      })
    }
  );

  const data = await res.json();
  return JSON.parse(data.candidates[0].content.parts[0].text);
}
