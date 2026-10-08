import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const CATEGORIES = [
  { to: "/books/self-dev", label: "Self-Development" },
  { to: "/books/philosophy", label: "Philosophy" },
  { to: "/books/novels", label: "Novels" },
  { to: "/books", label: "Newest Books", end: true },
  { to: "/books/best", label: "Best Of BookTown" },
];

const linkClass =
  "w-100 h-100 d-block spinner-border-sm bg-danger text-light border border-1 border-warning border-opacity-10";

// `search` / `onSearch` are only passed on product pages (search bar replaces hero strip).
export default function Header({ search, onSearch, hero = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const showSearch = onSearch !== undefined;

  return (
    <header className={`main-header ${hero ? "" : "fixed-top bg-light"}`}>
      <section className="row-1 d-flex flex-wrap-reverse flex-sm-nowrap justify-content-between align-content-center align-items-center py-4">
        {/* mobile dropdown menu */}
        <ul
          className="second-navbar-bi-list-clicked nav-bar list-unstyled position-absolute d-flex flex-column w-100"
          style={{ top: menuOpen ? "0rem" : "-40rem" }}
        >
          {CATEGORIES.map((c) => (
            <li key={c.to} className="categorie flex-grow-1 fs-18 text-center w-100" onClick={() => setMenuOpen(false)}>
              <Link to={c.to} role="button" className={linkClass}>{c.label}</Link>
            </li>
          ))}
          <li className="close-list-btn categorie flex-grow-1 fs-18 text-center w-100" onClick={() => setMenuOpen(false)}>
            <a role="button" className={linkClass}>Close<i className="bi bi-arrow-up ms-2" /></a>
          </li>
        </ul>

        <Link className="d-none d-md-block ms-5" to="/">
          <img className="logo-name w-50 img-fluid" src="/IMG/deafults/logo-name.svg" alt="BookTown" />
        </Link>
        <Link className="d-none d-sm-block d-md-none me-4 pb-1" to="/">
          <i role="button" className="bi bi-house-door-fill text-danger fs-32 ps-2" />
        </Link>

        {showSearch && (
          <nav className="navbar flex-grow-1 align-self-center me-sm-5 pe-lg-5">
            <div className="container-fluid me-sm-5 pe-sm-5">
              <form className="d-flex me-sm-5 pe-sm-5 w-100" role="search" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="searchBar form-control me-sm-2 h-100 w-100 border-danger border-opacity-25"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => onSearch(e.target.value)}
                />
              </form>
            </div>
          </nav>
        )}

        <div className="personal-profile d-flex gap-3 align-items-center justify-content-center me-5">
          <Link to="/">
            <i role="button" className="bi bi-house-door-fill text-danger fs-32 ps-2 d-block d-sm-none" />
          </Link>
          <Link to="/cart">
            <button type="button" className="btn btn-outline-danger d-flex align-items-center gap-2">
              <span className="icon-container">
                <i className="bi bi-bag-fill" />
                {count > 0 && <span id="cartCount">{count}</span>}
              </span>
              Purchase
            </button>
          </Link>
          <Link to="/profile">
            <button type="button" className="btn btn-outline-danger d-flex align-items-center gap-2">
              <i className="bi bi-person-fill" /> Profile
            </button>
          </Link>
          <i role="button" className="bi bi-list fs-32 ps-2 d-block d-sm-none" onClick={() => setMenuOpen(true)} />
        </div>
      </section>

      {hero && (
        <section className="row-2 py-5 d-none d-sm-block">
          <div className="header-img p-5">
            <div className="in-img-text bg-dark bg-opacity-25 my-5 p-5 d-flex flex-column justify-content-center gap-4">
              <h1 className="fs-46 align-self-center">welcome to the town of books</h1>
              <h3 className="fs-24 d-none d-md-block align-self-center ps-md-5 ms-md-5">
                easily find and purchase your favorite books.
              </h3>
            </div>
          </div>
        </section>
      )}

      <section className="row-3">
        <ul className="nav-bar list-unstyled d-none d-sm-flex">
          {CATEGORIES.map((c) => (
            <li key={c.to} className="categorie flex-grow-1 fs-18 text-center">
              <NavLink to={c.to} end={c.end} role="button" className={linkClass}>{c.label}</NavLink>
            </li>
          ))}
        </ul>
      </section>
    </header>
  );
}
