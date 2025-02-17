import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(
    Number(sessionStorage.getItem("cartItemCount")) || 0
  );

  // Update sessionStorage whenever cartItemCount changes
  useEffect(() => {
    sessionStorage.setItem("cartItemCount", cartItemCount);
  }, [cartItemCount]);

  // Listen for changes from other tabs or manual updates
  useEffect(() => {
    const syncCart = () => {
      setCartItemCount(Number(sessionStorage.getItem("cartItemCount")) || 0);
    };

    window.addEventListener("storage", syncCart);
    return () => {
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  return (
    <CartContext.Provider value={{ cartItemCount, setCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
