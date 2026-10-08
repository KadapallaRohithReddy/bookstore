import { useMemo, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BookCard from "../components/BookCard.jsx";
import books from "../data/books.js";

const SORTS = {
  "Cheapest to most expensive": (a, b) => a.price - b.price,
  "Most expensive to Cheapest": (a, b) => b.price - a.price,
  "Newest Books": (a, b) => a.date - b.date,
  "Best Of BookTown": (a, b) => b.rating - a.rating,
};

const DEFAULT_SORT = { newest: "Newest Books", best: "Best Of BookTown" };

// One page component for all five product pages (self-dev, philosophy, novels, newest, best).
export default function Products({ category }) {
  const [sortBy, setSortBy] = useState(DEFAULT_SORT[category] ?? "Newest Books");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  // reset sort when navigating between categories
  const [lastCategory, setLastCategory] = useState(category);
  if (lastCategory !== category) {
    setLastCategory(category);
    setSortBy(DEFAULT_SORT[category] ?? "Newest Books");
    setSearch("");
  }

  const visible = useMemo(() => {
    const inCategory =
      category === "newest" || category === "best" ? books : books.filter((b) => b.categories.includes(category));
    const q = search.trim().toLowerCase();
    return inCategory.filter((b) => b.name.toLowerCase().includes(q)).sort(SORTS[sortBy]);
  }, [category, search, sortBy]);

  return (
    <>
      <Header search={search} onSearch={setSearch} />
      <main className="main-body d-flex flex-column align-items-center justify-content-center text-center gap-4 pb-5 pt-5 container">
        <div className="dropdown align-self-start ms-5 ps-5 position-relative">
          <button className="btn btn-outline-danger dropdown-toggle" type="button" onClick={() => setOpen(!open)}>
            Sorted by <span className="sorted-by"> : {sortBy}</span>
          </button>
          <ul className={`dropdown-menu ${open ? "show" : ""}`}>
            {Object.keys(SORTS).map((label) => (
              <li key={label}>
                <a
                  className="dropdown-item"
                  role="button"
                  onClick={() => {
                    setSortBy(label);
                    setOpen(false);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="main d-flex flex-column flex-sm-row mx-auto flex-wrap gap-5 text-center justify-content-sm-evenly align-items-center">
          {visible.length === 0 && <p className="fs-24">No books match “{search}”.</p>}
          {visible.map((book) => (
            <BookCard key={book.id} book={book} wrapperClass="flex-column shadow" />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
