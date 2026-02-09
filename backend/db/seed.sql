TRUNCATE 
  ai_recommendations,
  agent_events,
  chat_messages,
  order_items,
  orders,
  cart_items,
  inventory,
  product_images,
  product_variants,
  products
RESTART IDENTITY CASCADE;
