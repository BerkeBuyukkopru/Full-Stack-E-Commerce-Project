import PropTypes from "prop-types";
import "./Info.css";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { FavoritesContext } from "../../../context/FavoritesContext";
import { message } from "antd";

const Info = ({ singleProduct }) => {
  const quantityRef = useRef();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const { addToCart, cartItems } = useContext(CartContext);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const originalPrice = singleProduct.productPrice?.current || 0;
  const discountPercentage = singleProduct.productPrice?.discount || 0;
  const discountedPrice = originalPrice - (originalPrice * discountPercentage) / 100;

  const productId = singleProduct._id || singleProduct.id;
  
  // Favori kontrolü (ID, Beden, Renk eşleşmeli - ama arayüzde sadece "Bu ürün favoride mi?" diye genel bakıyoruz genelde
  // Ancak kullanıcı spesifik bir varyasyonu favoriye eklediyse butonun durumu değişmeli mi?
  // Kullanıcı deneyimi için: Eğer bu varyasyon favorideyse "Favoriden Çıkar", yoksa "Ekle".
  // Şimdilik composite key ile kontrol edelim.
  const isFavorite = favorites.some((fav) => 
      (fav._id || fav.id) === productId && 
      fav.selectedSize === selectedSize?.size && 
      fav.selectedColor === selectedColor
  );

  // Beden verilerini normalize et (string[] veya object[] gelebilir)
  const availableSizes = Array.isArray(singleProduct.sizes) 
    ? singleProduct.sizes.map(s => {
        if (typeof s === 'string') return { size: s, stock: 10 }; // Legacy veri varsayılan stok
        return s;
    })
    : [];

  const handleAddToCart = () => {
      if (!selectedSize) {
          message.warning("Lütfen bir beden seçiniz.");
          return;
      }
      if (singleProduct.colors && singleProduct.colors.length > 0 && !selectedColor) {
           message.warning("Lütfen bir renk seçiniz.");
           return;
      }
      
      addToCart({
          ...singleProduct,
          id: productId,
          price: discountedPrice,
          quantity: parseInt(quantityRef.current.value),
          size: selectedSize.size,
          color: selectedColor
      });
      message.success("Ürün sepete eklendi.");
  };

  const handleToggleFavorite = () => {
      if (!selectedSize) {
          message.warning("Favoriye eklemek için beden seçiniz.");
          return;
      }
      if (singleProduct.colors && singleProduct.colors.length > 0 && !selectedColor) {
           message.warning("Favoriye eklemek için renk seçiniz.");
           return;
      }

      // API backend 'ToggleFavorite' expects { ProductId, Size, Color }
      // But FavoritesContext currently expects a product object?
      // We will assume FavoritesContext is updated or will be updated to handle this data.
      // We pass identifying info.
      
      if (isFavorite) {
           removeFromFavorites(productId, selectedSize.size, selectedColor);
      } else {
           addToFavorites({
              ...singleProduct,
              id: productId,
              price: discountedPrice,
              selectedSize: selectedSize.size, // Context naming convention
              selectedColor: selectedColor
           });
      }
  };

  return (
    <div className="product-info">
      <h1 className="product-title">{singleProduct.name}</h1>
      <div className="product-review">
        <ul className="product-star">
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-half"></i></li>
        </ul>
        <span>2 Yorum</span>
      </div>
      <div className="product-price">
        <s className="old-price">{originalPrice.toFixed(2)} TL</s>
        <strong className="new-price">{discountedPrice.toFixed(2)} TL</strong>
      </div>
      
      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      ></div>

      <form className="variations-form">
        <div className="variations">
          <div className="colors">
            <div className="colors-label">
              <span>Renk</span>
            </div>
            <div className="colors-wrapper">
              {singleProduct.colors.map((color, index) => (
                <div 
                    className={`color-wrapper ${selectedColor === color ? "active" : ""}`} 
                    key={index} 
                    style={{marginRight: 5}}
                    onClick={() => setSelectedColor(color)}
                >
                   <span style={{ 
                       border: selectedColor === color ? '2px solid black' : '1px solid #ddd', 
                       padding: '5px 10px', 
                       fontSize: '14px',
                       borderRadius: '4px',
                       backgroundColor: selectedColor === color ? '#f0f0f0' : 'white',
                       display: 'block'
                   }}>
                       {color}
                   </span>
                </div>
              ))}
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <span>Beden</span>
            </div>
            <div className="values-list">
              {availableSizes.map((sizeObj, index) => (
                <span 
                    key={index} 
                    className={selectedSize?.size === sizeObj.size ? "active" : ""}
                    onClick={() => setSelectedSize(sizeObj)}
                    style={{ 
                        cursor: 'pointer',
                        opacity: sizeObj.stock > 0 ? 1 : 0.5,
                        pointerEvents: sizeObj.stock > 0 ? 'auto' : 'none'
                    }}
                >
                  {sizeObj.size.toUpperCase()} 
                </span>
              ))}
            </div>
          </div>
          <div className="cart-button">
            <input
              type="number"
              defaultValue="1"
              min="1"
              id="quantity"
              ref={quantityRef}
            />
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              onClick={handleAddToCart}
            >
              Sepete Ekle
            </button>
            <button
              className="btn btn-lg btn-primary"
              type="button"
              onClick={handleToggleFavorite}
              style={{ marginLeft: "10px", backgroundColor: isFavorite ? "red" : "", borderColor: isFavorite ? "red" : "" }}
            >
              {isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
            </button>
          </div>
          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-globe"></i>
              <span>Beden Tablosu</span>
            </a>
            <a href="#">
              <i className="bi bi-share"></i>
              <span>Ürünü Paylaş</span>
            </a>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      
      {/* İstenmeyen kısımlar (SKU, Kategori, Tags) kaldırıldı */}

    </div>
  );
};

export default Info;

Info.propTypes = {
  singleProduct: PropTypes.object.isRequired,
};