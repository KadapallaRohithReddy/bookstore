export default function Footer() {
  return (
    <footer className="bg-light text-center text-white mt-5">
      <div className="container p-4 pb-0 border-top border-1 border-danger border-opacity-25">
        <section className="mb-4">
          <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#55acee" }} href="https://twitter.com/" role="button"><i className="bi bi-twitter" /></a>
          <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#dd4b39" }} href="https://mail.google.com/" role="button"><i className="bi bi-google" /></a>
          <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#ac2bac" }} href="https://www.instagram.com/" role="button"><i className="bi bi-instagram" /></a>
          <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#0082ca" }} href="https://www.linkedin.com/" role="button"><i className="bi bi-linkedin" /></a>
          <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#333333" }} href="https://github.com/gnaneshwar08/Online-Book-Browsing-Website" role="button"><i className="bi bi-github" /></a>
        </section>
      </div>
      <div className="text-center p-3 fs-18" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        BookTown — educational project
      </div>
    </footer>
  );
}
