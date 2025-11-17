const CartItem = () => {
  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src="img/products/product1/1.png" alt="" />
        <i className="bi bi-x delete-cart" data-id="1"></i>
      </td>
      <td>Sweatshirt</td>
      <td>900.00 TL</td>
      <td className="product-quantity">1</td>
      <td className="product-subtotal">900.00 TL</td>
    </tr>
  );
};

export default CartItem;