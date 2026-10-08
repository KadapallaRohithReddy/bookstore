import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import Payment from "./pages/Payment.jsx";
import NotFound from "./pages/NotFound.jsx";
import Toast from "./components/Toast.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Products category="newest" />} />
        <Route path="/books/self-dev" element={<Products category="self-dev" />} />
        <Route path="/books/philosophy" element={<Products category="philosophy" />} />
        <Route path="/books/novels" element={<Products category="novel" />} />
        <Route path="/books/best" element={<Products category="best" />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toast />
    </>
  );
}
