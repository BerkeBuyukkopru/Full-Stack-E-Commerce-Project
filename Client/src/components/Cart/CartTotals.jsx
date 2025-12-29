import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { message, Button } from "antd";
import AddressModal from "../Modals/AddressModal";

const CartTotals = () => {
  const [cargoChecked, setCargoChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState(null);
  
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const cartItemTotals = cartItems.map((item) => {
    return item.price * item.quantity;
  });

  const subTotals = cartItemTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  const cargoPrice = 90;

  const cartTotals = cargoChecked
    ? (subTotals + cargoPrice).toFixed(2)
    : subTotals.toFixed(2);

  const handleCheckout = () => {
    if (!user) {
      message.info("Ödeme yapabilmek için giriş yapmanız gerekmektedir.");
      return;
    }
    if (!address) {
        message.warning("Lütfen bir teslimat adresi seçin.");
        return;
    }
    navigate("/payment");
  };

  const handleAddressClick = () => {
      if (!user) {
          message.info("Adres seçmek için giriş yapmalısınız.");
          return;
      }
      setIsModalOpen(true);
  }

  return (
    <div className="cart-totals">
      <h2>Sepet</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Toplam Fiyat</th>
            <td>
              <span id="subtotal">{subTotals.toFixed(2)} TL</span>
            </td>
          </tr>
          <tr>
            <th>Kargo</th>
            <td>
               <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '5px' }}>
                 Kargo: 90 TL
                 <input
                   type="checkbox"
                   id="cargo"
                   checked={cargoChecked}
                   onChange={() => setCargoChecked(!cargoChecked)}
                 />
               </label>
            </td>
          </tr>
          <tr>
            <th>Teslimat Adresi</th>
            <td>
                {address ? (
                    <div style={{ textAlign: 'right', fontSize: '13px' }}>
                        <strong>{address.title}</strong>
                        <br/>
                        <Button type="link" size="small" onClick={handleAddressClick} style={{ color: 'darkred' }}>Değiştir</Button>
                    </div>
                ) : (
                    <Button type="link" onClick={handleAddressClick} style={{ color: 'darkred' }}>Adres Seç</Button>
                )}
            </td>
          </tr>
          <tr>
            <th>Sepet Tutarı</th>
            <td>
              <strong id="cart-total">{cartTotals} TL</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button 
          className="btn btn-lg" 
          onClick={handleCheckout}
        >
          Sepeti Onayla
        </button>
      </div>

      <AddressModal 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setAddress={setAddress}
      />
    </div>
  );
};

export default CartTotals;
