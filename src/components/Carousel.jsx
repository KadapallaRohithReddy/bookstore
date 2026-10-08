import { useState } from "react";
import BookCard from "./BookCard.jsx";

// Splits `books` into slides of `perSlide` and pages through them.
// Replaces the Bootstrap JS carousels + innerHTML string building in Home-Page/script.js.
export default function BookCarousel({ title, books, perSlide = 4 }) {
  const slides = [];
  for (let i = 0; i < books.length; i += perSlide) slides.push(books.slice(i, i + perSlide));
  const [index, setIndex] = useState(0);
  if (slides.length === 0) return null;

  const go = (d) => setIndex((index + d + slides.length) % slides.length);
  const colClass = perSlide === 3 ? "col-lg-4 col-sm-6" : "col-lg-3 col-sm-6";

  return (
    <section className="shadow-sm">
      <div className="row shadow border border-2 border-danger rounded-4 border-opacity-50 p-3">
        <div className="col-md-12">
          <h2>{title}</h2>
          <div className="carousel slide carousel-dark">
            <div className="carousel-inner">
              {slides.map((slide, s) => (
                <div key={s} className={`item carousel-item ${s === index ? "active" : ""}`}>
                  <div className="row d-flex justify-content-evenly">
                    {slide.map((book) => (
                      <div key={book.id} className={colClass}>
                        <BookCard book={book} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {slides.length > 1 && (
              <>
                <a className="carousel-control-prev" role="button" onClick={() => go(-1)}>
                  <i className="fa fa-angle-left" />
                </a>
                <a className="carousel-control-next" role="button" onClick={() => go(1)}>
                  <i className="fa fa-angle-right" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
