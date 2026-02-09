"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { post } from "../../lib/api";
import { getSession } from "../../lib/session";

type Msg = { role: "user" | "ai"; text: string };

export default function MobilePage() {
  const router = useRouter();

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Create session + greeting once
  useEffect(() => {
    getSession("mobile").then(async (sid) => {
      setSessionId(sid);

    setMessages([
    {
        role: "ai",
        text:
          "Hi 👋 I’m Loom AI. I can help you shop for shirts, t-shirts, jeans, blazers and dresses. Try something like “t-shirts under 1500”."
    }
    ]);

      setProducts([]);
    });
  }, []);

  async function sendMessage() {
    if (!input.trim() || !sessionId) return;

    const userMsg = input.trim();
    setInput("");
    setLoading(true);

    // append user message
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setProducts([]); // 🔥 clear old recommendations

    const res = await post("/chat/message", {
      sessionId,
      message: userMsg
    });

    setMessages((m) => [...m, { role: "ai", text: res.reply }]);
    setProducts(res.products ?? []);
    setLoading(false);
  }

  async function addToCart(variantId: number) {
    if (!sessionId) return;

    await post("/cart/add", {
      sessionId,
      variantId
    });

    alert("Added to cart");
  }

  async function buyNow(variantId: number) {
  if (!sessionId) return;

  await post("/cart/add", { sessionId, variantId });
  router.push("/checkout");
    }

  return (
    <>
      <Navbar mode="mobile" showBack />

      <div className="page mobile-layout">
        {/* CHAT PANEL */}
        <div className="chat">
          <div className="chat-header">Loom AI Assistant</div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-bubble ${m.role === "user" ? "user" : "ai"}`}
              >
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-bubble ai">Thinking…</div>}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Try: tshirts under 1500, black blazer, jeans…"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>

        {/* RECOMMENDATIONS PANEL */}
        <div className="products">
          <h4>Recommended</h4>

          {products.length === 0 && (
            <p style={{ fontSize: 13, color: "#64748b" }}>
              Products will appear here based on your chat
            </p>
          )}

          {products.map((p) => (
            <div key={p.variant_id} className="product-card">
              <img src={p.image} alt={p.name} />

              <div className="info">
                <h4>{p.name}</h4>
                <p>
                  Size {p.size} · ₹{p.price}
                </p>

                <button onClick={() => addToCart(p.variant_id)}>
                  Add to Cart
                </button>

                <button
                  style={{
                    marginTop: 6,
                    background: "#2563eb"
                  }}
                  onClick={() => buyNow(p.variant_id)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
