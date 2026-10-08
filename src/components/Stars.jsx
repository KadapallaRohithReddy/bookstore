// Replaces the pre-rendered `stars` HTML strings from the old Data.js.
export default function Stars({ rating }) {
  return (
    <div className="ratings star-rating">
      {[1, 2, 3, 4, 5].map((n) => {
        const icon = rating >= n ? "bi-star-fill" : rating >= n - 0.5 ? "bi-star-half" : "bi-star";
        return <i key={n} className={`bi ${icon} text-warning`} />;
      })}
    </div>
  );
}
