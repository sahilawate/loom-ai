import Navbar from "../components/Navbar";

export default function Staff() {
  return (
    <>
      <Navbar mode="staff" />
      <div className="page two-col">
        <div className="surface">
          <strong>Customer</strong>
          <p>Rahul Jain · Gold Member</p>
        </div>
        <div className="surface">
          <strong>Reserved Items</strong>
          <p>Classic Navy Blazer</p>
        </div>
      </div>
    </>
  );
}
