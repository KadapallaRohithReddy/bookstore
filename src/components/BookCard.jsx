import Stars from "./Stars.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function BookCard({ book, wrapperClass = "" }) {
  const { addToCart } = useCart();
  return (
    <div className={`thumb-wrapper ${wrapperClass}`}>
      <div className="img-box">
        <img src={book.cover} className="img-fluid" alt={book.name} />
      </div>
      <div className="thumb-content">
        <h4 className="book-name">{book.name}</h4>
        <Stars rating={book.rating} />
        <p className="item-price">
          {book.lastPrice && <strike>${book.lastPrice}</strike>} <b>${book.price}</b>
        </p>
        <button className="btn btn-outline-danger" onClick={() => addToCart(book)}>
          Add to Cart <i className="bi bi-bag" />
        </button>
      </div>
    </div>
  );
}
