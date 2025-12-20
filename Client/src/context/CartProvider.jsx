import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  // ✨ Kuponun uygulanıp uygulanmadığını takip eden state
  const [appliedCoupon, setAppliedCoupon] = useState(
    localStorage.getItem("appliedCoupon")
      ? JSON.parse(localStorage.getItem("appliedCoupon"))
      : null
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // ✨ Kupon bilgisini de localStorage'da saklayalım (Sayfa yenilenince gitmesin)
    localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon));
  }, [cartItems, appliedCoupon]);

  const addToCart = (cartItem) => {
    setCartItems((prevCart) => [
      ...prevCart,
      { ...cartItem, quantity: cartItem.quantity ? cartItem.quantity : 1 },
    ]);
  };

  const removeFromCart = (itemId) => {
    const filteredCartItems = cartItems.filter((cartItem) => cartItem.id !== itemId);
    setCartItems(filteredCartItems);
    // Eğer sepette ürün kalmazsa kuponu da sıfırlayalım
    if (filteredCartItems.length === 0) setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        appliedCoupon,
        setAppliedCoupon 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

CartProvider.propTypes = {
  children: PropTypes.node,
};