import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BookCarousel from "../components/Carousel.jsx";
import BookCard from "../components/BookCard.jsx";
import books from "../data/books.js";

const HERO_IMAGES = [
  "https://wallpaperaccess.com/full/2878928.jpg",
  "https://wallpaperaccess.com/full/1771687.jpg",
  "https://wallpaperaccess.com/full/1692872.jpg",
];
const PHILOSOPHY_IMAGES = [
  "/IMG/deafults/nietche.jpg",
  "/IMG/deafults/wallpaperflare.com_wallpaper.jpg",
  "/IMG/deafults/philo.jpg",
];
const NOVEL_IMAGES = ["/IMG/deafults/novels.jpg", "/IMG/deafults/books.jpg", "/IMG/deafults/comics.jpg"];

// Auto-rotating banner (replaces Bootstrap data-bs-ride carousels).
function Banner({ images, caption, alt, to }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);

  const body = (
    <div className="carousel slide d-none d-md-block">
      <div className="carousel-inner">
        {images.map((src, n) => (
          <div key={src} className={`carousel-item ${n === i ? "active" : ""}`}>
            <img src={src} className="d-block w-100 h-100 rounded-4" alt={alt} />
          </div>
        ))}
        <h4 className="d-block fs-38 position-absolute bottom-0 w-100 text-center py-5 mb-0 text-light bg-dark bg-opacity-50 rounded-4">
          {caption}
        </h4>
      </div>
    </div>
  );
  return to ? <Link to={to}>{body}</Link> : body;
}

export default function Home() {
  const sections = useMemo(() => {
    const byRating = [...books].sort((a, b) => b.rating - a.rating);
    return {
      newest: books.filter((b) => b.date <= 12),
      best: byRating.slice(0, 12),
      deals: books.filter((b) => b.deal).slice(0, 12),
      philosophy: books.filter((b) => b.categories.includes("philosophy")).slice(0, 8),
      selfDev: books.filter((b) => b.categories.includes("self-dev")).slice(0, 9),
      novels: byRating.filter((b) => b.categories.includes("novel")).slice(0, 12),
      newestOne: [...books].sort((a, b) => a.date - b.date)[0],
    };
  }, []);

  return (
    <>
      <Header hero />
      <main className="main-body container mt-5 d-flex flex-column gap-5">
        <section className="upper-main-body d-flex flex-column flex-xl-row gap-5 justify-content-start w-100">
          <Banner images={HERO_IMAGES} alt="Boy reading a book" caption="Find any books you need!" />

          <div className="newest-book d-none d-xl-flex align-items-center justify-content-center">
            <div className="card d-flex col-1 flex-column align-items-center" style={{ width: "18rem", border: "none" }}>
              <img src="/IMG/deafults/best.png" className="card-img-top w-75" alt="Newest book" />
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title fs-24">Newest Book</h5>
              </div>
            </div>
            <div className="col-6 border-start flex-grow-1 w-75 border-2 border-danger border-opacity-50">
              <BookCard book={sections.newestOne} wrapperClass="d-flex flex-column align-items-center" />
            </div>
          </div>

          <div className="d-xl-none w-100">
            <BookCarousel title={<>Newest <b>books</b></>} books={sections.newest} />
          </div>
        </section>

        <BookCarousel title={<>best of <b>BookTown</b></>} books={sections.best} />
        <BookCarousel title={<>Best <b>Deals</b></>} books={sections.deals} />

        <Banner images={PHILOSOPHY_IMAGES} alt="Philosophy" caption="Read Philosophy books here." to="/books/philosophy" />
        <BookCarousel title={<>best of <b>Philosophy</b></>} books={sections.philosophy} />
        <BookCarousel title={<>Best of <b>self-development</b></>} books={sections.selfDev} perSlide={3} />

        <Banner images={NOVEL_IMAGES} alt="Novels" caption="Read Novels here." to="/books/novels" />
        <BookCarousel title={<>Best of <b>novels</b></>} books={sections.novels} />
      </main>
      <Footer />
    </>
  );
}
