import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// Demo payment form only — nothing is sent anywhere and card details are never stored.
export default function Payment() {
  const { state } = useLocation();
  const { clear, subtotal } = useCart();
  const [done, setDone] = useState(false);
  const [method, setMethod] = useState("card");
  const [gender, setGender] = useState("male");
  const year = new Date().getFullYear();
  const amount = state?.total ?? subtotal;

  const submit = (e) => {
    e.preventDefault();
    clear();
    setDone(true);
  };

  if (done) {
    return (
      <div className="payment-page">
        <div className="wrapper text-center">
          <h2>Order placed 🎉</h2>
          <p className="my-4">Thank you for shopping at BookTown.</p>
          <Link to="/" className="btn btn-danger">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="wrapper">
        <h2>Payment Form</h2>
        <p className="mt-2">Amount due: <b>${amount}</b></p>
        <form onSubmit={submit}>
          <h4>Account</h4>
          <div className="input-group">
            <div className="input-box">
              <input type="text" placeholder="Full Name" required className="name" />
              <i className="fa fa-user icon" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Nick Name" required className="name" />
              <i className="fa fa-user icon" />
            </div>
          </div>
          <div className="input-group">
            <div className="input-box">
              <input type="email" placeholder="Email Address" required className="name" />
              <i className="fa fa-envelope icon" />
            </div>
          </div>
          <div className="input-group">
            <div className="input-box">
              <h4>Date of Birth</h4>
              <input type="text" placeholder="DD" className="dob" maxLength={2} />
              <input type="text" placeholder="MM" className="dob" maxLength={2} />
              <input type="text" placeholder="YYYY" className="dob" maxLength={4} />
            </div>
            <div className="input-box">
              <h4>Gender</h4>
              <input type="radio" id="g1" name="gender" className="radio" checked={gender === "male"} onChange={() => setGender("male")} />
              <label htmlFor="g1">Male</label>
              <input type="radio" id="g2" name="gender" className="radio" checked={gender === "female"} onChange={() => setGender("female")} />
              <label htmlFor="g2">Female</label>
            </div>
          </div>
          <div className="input-group">
            <div className="input-box">
              <h4>Payment Details</h4>
              <input type="radio" id="p1" name="pay" className="radio" checked={method === "card"} onChange={() => setMethod("card")} />
              <label htmlFor="p1"><span><i className="fa fa-cc-visa" /> Credit Card</span></label>
              <input type="radio" id="p2" name="pay" className="radio" checked={method === "paypal"} onChange={() => setMethod("paypal")} />
              <label htmlFor="p2"><span><i className="fa fa-cc-paypal" /> Paypal</span></label>
            </div>
          </div>
          {method === "card" && (
            <>
              <div className="input-group">
                <div className="input-box">
                  <input type="tel" placeholder="Card Number" required className="name" inputMode="numeric" autoComplete="off" />
                  <i className="fa fa-credit-card icon" />
                </div>
              </div>
              <div className="input-group">
                <div className="input-box">
                  <input type="tel" placeholder="Card CVC" required className="name" inputMode="numeric" autoComplete="off" />
                  <i className="fa fa-user icon" />
                </div>
                <div className="input-box">
                  <select defaultValue={MONTHS[0]}>
                    {MONTHS.map((m) => <option key={m}>{m}</option>)}
                  </select>
                  <select defaultValue={year}>
                    {Array.from({ length: 8 }, (_, i) => year + i).map((y) => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}
          <div className="input-group">
            <div className="input-box">
              <button type="submit">PAY NOW</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
