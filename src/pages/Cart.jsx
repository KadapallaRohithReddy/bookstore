import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useCart } from "../context/CartContext.jsx";

const round2 = (n) => Math.round(n * 100) / 100;

export default function Cart() {
  const { items, subtotal, increment, decrement, remove } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0); // percent

  const total = round2(subtotal - (subtotal * discount) / 100);

  // Original rule: enter a number 1–70 and press Enter to get that % off.
  const applyCode = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const n = Number(code);
    setDiscount(n >= 1 && n <= 70 ? n : 0);
  };

  return (
    <>
      <Header />
      <section className="h-100 h-custom" style={{ marginTop: "12rem" }}>
        <div className="container h-100 py-sm-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col border border-danger rounded px-sm-3 py-3">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="h5">Shopping Bag</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Price</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center py-5 fs-24">
                          Your bag is empty. <Link to="/books" className="text-danger">Browse books</Link>
                        </td>
                      </tr>
                    )}
                    {items.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src={p.cover} className="img-fluid rounded-3" style={{ width: 120 }} alt={p.name} />
                            <div className="flex-column ms-4">
                              <p className="mb-2 d-none d-sm-inline-block">{p.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center gap-2">
                            <button className="btn btn-outline-danger btn-sm" onClick={() => decrement(p.id)} title="Decrease">
                              <i className="bi bi-dash-lg" />
                            </button>
                            <span>{p.qty}</span>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => increment(p.id)} title="Increase">
                              <i className="bi bi-plus-lg" />
                            </button>
                          </div>
                        </td>
                        <td className="align-middle">
                          {p.lastPrice && <strike className="text-secondary">${p.lastPrice}</strike>}
                          <p className="mb-0" style={{ fontWeight: 500 }}>${round2(p.price * p.qty)}</p>
                        </td>
                        <td className="align-middle">
                          <button className="btn btn-outline-danger btn-sm" onClick={() => remove(p.id)} title="Remove item">
                            <i className="bi bi-trash" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card border-0 rounded-0 mt-3">
                <div className="card-body pb-0">
                  <button
                    type="button"
                    className="btn btn-danger btn-block btn-lg w-100"
                    disabled={items.length === 0}
                    onClick={() => setShowModal(true)}
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Are you sure about your purchase?</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  {items.map((p) => (
                    <div key={p.id} className="d-flex justify-content-between align-items-center py-3 pe-4">
                      <div className="d-flex align-items-center">
                        <img src={p.cover} className="img-fluid rounded-3" style={{ width: 120 }} alt={p.name} />
                        <p className="mb-2 ms-4 d-none d-sm-inline fs-10">{p.name} × {p.qty}</p>
                      </div>
                      <p className="mb-0" style={{ fontWeight: 500 }}>${round2(p.price * p.qty)}</p>
                    </div>
                  ))}
                </div>
                <hr className="my-2" />
                <div className="modal-body-2 px-4">
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control border border-danger border-opacity-25"
                        id="discount"
                        placeholder="Discount"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={applyCode}
                      />
                      <label htmlFor="discount">Discount code (a number 1–70, press Enter)</label>
                    </div>
                    {discount > 0 && <small className="text-success">{discount}% discount applied</small>}
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5 className="text-uppercase">Total price :</h5>
                    <h5>${total}</h5>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-danger" onClick={() => setShowModal(false)}>Close</button>
                  <button type="button" className="btn btn-danger" onClick={() => navigate("/payment", { state: { total } })}>
                    Go To Payment Page
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </>
  );
}
