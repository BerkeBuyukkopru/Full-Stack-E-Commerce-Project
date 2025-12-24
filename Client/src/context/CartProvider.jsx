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
    // cartItem içinde { ...product, size: "M", color: "Red" } vb. gelmeli
    // Sepeti (id + size + color) kombinasyonuyla kontrol et
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color
      );
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color
            ? { ...item, quantity: item.quantity + (cartItem.quantity || 1) }
            : item
        );
      } else {
        return [
          ...prevCart,
          { ...cartItem, quantity: cartItem.quantity ? cartItem.quantity : 1 },
        ];
      }
    });
  };

  const removeFromCart = (itemId, itemSize, itemColor) => {
    // Silerken de id + size + color
    const filteredCartItems = cartItems.filter(
        (cartItem) => !(cartItem.id === itemId && cartItem.size === itemSize && cartItem.color === itemColor)
    );
    setCartItems(filteredCartItems);
    if (filteredCartItems.length === 0) setAppliedCoupon(null);
  };

  const updateItemQuantity = (itemId, itemSize, itemColor, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        (item.id === itemId && item.size === itemSize && item.color === itemColor) ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
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