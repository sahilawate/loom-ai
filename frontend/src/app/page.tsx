import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar mode="home" />
      <div className="page">
        <div className="launcher-header">
          <h1>Loom AI – Unified Retail Assistant</h1>
          <p>One AI brain across mobile, WhatsApp and store</p>
        </div>

        <div className="launcher-grid-3">
          <Launch href="/mobile" icon="📱" title="Mobile" desc="Browse & shop with AI" />
          <Launch href="/whatsapp" icon="💬" title="WhatsApp" desc="Continue chat on WhatsApp" />
          <Launch href="/staff" icon="🏬" title="Staff View" desc="Store associate dashboard" />
        </div>

        <div className="launcher-grid-2">
          <Launch href="/checkout" icon="🛒" title="Checkout" desc="Complete your purchase" />
          <Launch href="/agents" icon="🧠" title="Agents Debug" desc="View AI agent timeline" />
        </div>
      </div>
    </>
  );
}

function Launch({ href, icon, title, desc }: any) {
  return (
    <a href={href} className="launch-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </a>
  );
}
