import { message } from "antd";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  // ✨ Context'ten kupon bilgilerini alıyoruz
  const { cartItems, setCartItems, appliedCoupon, setAppliedCoupon } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const applyCoupon = async () => {
    // 🔒 ENGELLEME: Eğer zaten bir kupon uygulanmışsa işlemi durdur
    if (appliedCoupon) {
      return message.warning("Bu alışverişte zaten bir kupon kullandınız!");
    }

    if (couponCode.trim().length === 0) {
      return message.warning("Lütfen bir kupon kodu giriniz.");
    }

    try {
      const res = await fetch(`${apiUrl}/coupon/code/${couponCode}`);

      if (!res.ok) {
        return message.error("Girdiğiniz kupon kodu geçersiz!");
      }

      const data = await res.json();
      const discountPercent = data.discountPercent;

      setAppliedCoupon(data); // ✨ Kupon nesnesini kaydederek sistemi kilitliyoruz
      message.success(`${couponCode} kuponu ile %${discountPercent} indirim uygulandı.`);
      setCouponCode("");
    } catch (error) {
      console.log("Kupon hatası:", error);
      message.error("Kupon uygulanırken bir hata oluştu.");
    }
  };

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder={appliedCoupon ? "Kupon uygulandı" : "Kupon Kodu"}
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
          disabled={!!appliedCoupon} // ✨ Kupon varsa girişi kapat
        />
        <button 
           className="btn" 
           type="button" 
           onClick={applyCoupon}
           disabled={!!appliedCoupon} // ✨ Kupon varsa butonu kapat
        >
          {appliedCoupon ? "Uygulandı" : "Kupon Uygula"}
        </button>
      </div>

    </div>
  );
};

export default CartCoupon;