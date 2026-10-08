import { createContext, useContext, useEffect, useReducer, useState, useCallback } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "booktown-cart";

// Cart items are { id, name, cover, price, lastPrice, qty }.
// (The original app pushed a duplicate row per click; qty replaces that.)
function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const found = state.find((i) => i.id === action.book.id);
      if (found) return state.map((i) => (i.id === found.id ? { ...i, qty: i.qty + 1 } : i));
      const { id, name, cover, price, lastPrice } = action.book;
      return [...state, { id, name, cover, price, lastPrice, qty: 1 }];
    }
    case "increment":
      return state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i));
    case "decrement":
      return state.flatMap((i) =>
        i.id !== action.id ? [i] : i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []
      );
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], load);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((book) => {
    dispatch({ type: "add", book });
    setToast(`${book.name} added to cart!`);
  }, []);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = Math.round(items.reduce((s, i) => s + i.price * i.qty, 0) * 100) / 100;

  const value = {
    items,
    count,
    subtotal,
    addToCart,
    increment: (id) => dispatch({ type: "increment", id }),
    decrement: (id) => dispatch({ type: "decrement", id }),
    remove: (id) => dispatch({ type: "remove", id }),
    clear: () => dispatch({ type: "clear" }),
    toast,
    dismissToast: () => setToast(null),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
