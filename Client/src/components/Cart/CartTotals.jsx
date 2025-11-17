const CartTotals = () => {
  return (
    <div className="cart-totals">
      <h2>Sepet</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Toplam Fiyat</th>
            <td>
              <span id="subtotal">1800 TL</span>
            </td>
          </tr>
          <tr>
            <th>Adres</th>
            <td>
              <ul>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Sepet Tutarı</th>
            <td>
              <strong id="cart-total">1800 TL</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg">Sepeti Onayla</button>
      </div>
    </div>
  );
};

export default CartTotals;