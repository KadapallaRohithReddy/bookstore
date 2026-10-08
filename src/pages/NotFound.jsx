import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container text-center" style={{ marginTop: "16rem" }}>
        <h1 className="display-1 text-danger">404</h1>
        <p className="fs-24 my-4">This page wandered off the shelf.</p>
        <Link to="/" className="btn btn-danger">Back to BookTown</Link>
      </main>
    </>
  );
}
