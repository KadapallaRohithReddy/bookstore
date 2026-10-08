import { useState } from "react";
import Header from "../components/Header.jsx";

const KEY = "userData";
const EMPTY = { firstName: "", lastName: "", userName: "", city: "", address: "", agree: false };

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export default function Profile() {
  const [saved, setSaved] = useState(loadUser);
  const [form, setForm] = useState(EMPTY);
  const [validated, setValidated] = useState(false);

  const set = (field) => (e) =>
    setForm({ ...form, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;
    localStorage.setItem(KEY, JSON.stringify(form));
    setSaved(form);
  };

  const reset = () => {
    setForm(EMPTY);
    setValidated(false);
  };

  const edit = () => {
    localStorage.removeItem(KEY);
    setSaved(null);
    setForm(EMPTY);
    setValidated(false);
  };

  return (
    <>
      <Header />
      <section className="container p-5" style={{ marginTop: "12rem" }}>
        {saved?.firstName ? (
          <div className="border border-danger p-5 rounded text-center fs-2">
            <span>You have successfully signed up {saved.firstName}</span>
            <button className="edit-btn btn btn-outline-danger bi bi-pencil-square m-2 px-3 fs-2 border-0" title="Edit Information" onClick={edit} />
          </div>
        ) : (
          <form className={`row g-3 border border-danger p-5 rounded ${validated ? "was-validated" : ""}`} noValidate onSubmit={submit} onReset={reset}>
            <div className="col-md-4">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input id="firstName" className="form-control" required value={form.firstName} onChange={set("firstName")} />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input id="lastName" className="form-control" required value={form.lastName} onChange={set("lastName")} />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-4">
              <label htmlFor="userName" className="form-label">Username</label>
              <div className="input-group has-validation">
                <span className="input-group-text">@</span>
                <input id="userName" className="form-control" required value={form.userName} onChange={set("userName")} />
                <div className="invalid-feedback">Please choose a username.</div>
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="city" className="form-label">City</label>
              <input id="city" className="form-control" required value={form.city} onChange={set("city")} />
              <div className="invalid-feedback">Please provide a valid city.</div>
            </div>
            <div className="col-md-8">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea id="address" className="form-control" required value={form.address} onChange={set("address")} />
              <div className="invalid-feedback">Please provide a valid address.</div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input id="agree" className="form-check-input" type="checkbox" required checked={form.agree} onChange={set("agree")} />
                <label htmlFor="agree" className="form-check-label">Agree to terms and conditions</label>
                <div className="invalid-feedback">You must agree before submitting.</div>
              </div>
            </div>
            <div className="d-flex gap-3">
              <button className="btn btn-danger" type="submit">Submit form</button>
              <button className="btn btn-outline-danger" type="reset">Reset</button>
            </div>
          </form>
        )}
      </section>
    </>
  );
}
