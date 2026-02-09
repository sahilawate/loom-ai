"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { post, get } from "../../lib/api";

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();
  const variantId = params.get("variant");

  const [item, setItem] = useState<any>(null);
  const [method, setMethod] = useState("cod");

  useEffect(() => {
    if (!variantId) return;
    get(`/products/variant/${variantId}`).then(setItem);
  }, [variantId]);

  if (!item) return null;

  const delivery = 200;
  const total = item.price + delivery;

  async function placeOrder() {
    await post("/orders/create", {
      variantId,
      paymentMethod: method
    });

    alert("Order placed successfully!");
    router.push("/orders");
  }

  return (
    <>
      <Navbar mode="checkout" showBack />
      <div className="page surface">
        <h3>Checkout</h3>

        <p>{item.name}</p>
        <p>Price: ₹{item.price}</p>
        <p>Delivery: ₹{delivery}</p>
        <h4>Total: ₹{total}</h4>

        <div>
          <label>
            <input
              type="radio"
              checked
              onChange={() => setMethod("cod")}
            />
            Cash on Delivery
          </label>
        </div>

        <button
          style={{ marginTop: 16, width: "100%" }}
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
    </>
  );
}
