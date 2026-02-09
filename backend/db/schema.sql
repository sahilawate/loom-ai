CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- USERS (OPTIONAL / FUTURE)
-- =========================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- SESSIONS (CORE)
-- =========================
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  channel TEXT CHECK (channel IN ('web','mobile','whatsapp','staff')) NOT NULL,
  current_stage TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- PRODUCTS (CATALOG)
-- =========================
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  brand TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- PRODUCT VARIANTS (SIZE, COLOR)
-- =========================
CREATE TABLE product_variants (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  size TEXT,
  color TEXT,
  price INTEGER NOT NULL,
  sku TEXT UNIQUE
);

-- =========================
-- PRODUCT IMAGES
-- =========================
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT,
  is_primary BOOLEAN DEFAULT false
);

-- =========================
-- INVENTORY
-- =========================
CREATE TABLE inventory (
  variant_id INTEGER PRIMARY KEY REFERENCES product_variants(id),
  quantity INTEGER DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- CART
-- =========================
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  variant_id INTEGER REFERENCES product_variants(id),
  quantity INTEGER DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- ORDERS (MVP READY)
-- =========================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id),
  total_amount INTEGER,
  status TEXT CHECK (status IN ('pending','paid','cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  variant_id INTEGER REFERENCES product_variants(id),
  quantity INTEGER,
  price INTEGER
);

-- =========================
-- CHAT MEMORY
-- =========================
CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user','assistant')),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- AGENT EXPLAINABILITY
-- =========================
CREATE TABLE agent_events (
  id SERIAL PRIMARY KEY,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  agent_name TEXT,
  action TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- AI RECOMMENDATIONS (TRACEABLE)
-- =========================
CREATE TABLE ai_recommendations (
  id SERIAL PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  variant_id INTEGER REFERENCES product_variants(id),
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
