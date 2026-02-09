export default function Navbar({ mode }: { mode: string }) {
  return (
    <div className="navbar">
      <div className="nav-left">Loom AI</div>
      <div className="nav-right">
        <span className="badge">{mode}</span>
      </div>
    </div>
  );
}
