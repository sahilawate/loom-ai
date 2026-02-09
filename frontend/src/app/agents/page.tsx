import Navbar from "../components/Navbar";

export default function Agents() {
  return (
    <>
      <Navbar mode="debug" />
      <div className="page surface">
        <div className="agent">
          <div className="agent-dot" />
          <p>SalesAgent detected fashion intent</p>
        </div>
        <div className="agent">
          <div className="agent-dot" />
          <p>InventoryAgent checked stock</p>
        </div>
        <div className="agent">
          <div className="agent-dot" />
          <p>LoyaltyAgent applied offer</p>
        </div>
      </div>
    </>
  );
}
