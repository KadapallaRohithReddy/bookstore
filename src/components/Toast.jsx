import { useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";

export default function Toast() {
  const { toast, dismissToast } = useCart();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismissToast, 2000);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  if (!toast) return null;
  return (
    <div
      className="position-fixed bottom-0 end-0 m-4 p-3 bg-danger text-light rounded shadow"
      style={{ zIndex: 2000, fontSize: "1.6rem" }}
      role="status"
    >
      {toast}
    </div>
  );
}
