import CartItem from "./CartItem";

const CartTable = () => {
  return (
    <table className="shop-table">
      <thead>
        <tr>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Ürün</th>
          <th className="product-price">Fiyat</th>
          <th className="product-quantity">Adet</th>
          <th className="product-subtotal">Fiyat</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
        <CartItem />
        <CartItem />
      </tbody>
    </table>
  );
};

export default CartTable;