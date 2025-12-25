import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { CartContext } from "../context/CartContext";
import { Table, Button, Space, message } from "antd";

import "./FavoritesPage.css";

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const { addToCart, cartItems } = useContext(CartContext);

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img
          src={imgSrc && imgSrc.length > 0 ? imgSrc[0] : ""}
          alt="Ürün"
          style={{ width: "80px", height: "auto", objectFit: "cover", borderRadius: "5px" }}
        />
      ),
    },
    {
      title: "Ürün Adı",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Renk",
      dataIndex: "selectedColor",
      key: "selectedColor",
      render: (text) => <span>{text || "-"}</span>,
    },
    {
      title: "Beden",
      dataIndex: "selectedSize",
      key: "selectedSize",
      render: (text) => <span>{text ? text.toUpperCase() : "-"}</span>,
    },
    {
      title: "Fiyat",
      dataIndex: "productPrice",
      key: "price",
      render: (productPrice) => {
           const originalPrice = productPrice?.current || 0;
           const discountPercentage = productPrice?.discount || 0;
           const discountedPrice = originalPrice - (originalPrice * discountPercentage) / 100;
           return (
               <span>
                  {discountedPrice.toFixed(2)} TL
               </span>
           );
      }
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => {
        const isProductInCart = cartItems.some((item) => 
            item.id === (record._id || record.id) &&
            item.size === record.selectedSize &&
            item.color === record.selectedColor
        );
        
        return (
          <Space>
            <Button 
              className="add-to-cart-btn"
              onClick={() => {
                   if (isProductInCart) {
                       message.warning("Bu ürün zaten sepetinizde ekli.");
                       return;
                   }
                   const originalPrice = record.productPrice?.current || 0;
                   const discountPercentage = record.productPrice?.discount || 0;
                   const discountedPrice = originalPrice - (originalPrice * discountPercentage) / 100;
                   
                   addToCart({
                      ...record,
                      id: record._id || record.id,
                      price: discountedPrice,
                      size: record.selectedSize,
                      color: record.selectedColor,
                      quantity: 1
                   });
                   message.success("Ürün sepete eklendi.");
              }}
            >
              Sepete Ekle
            </Button>
            <Button 
              className="remove-from-fav-btn"
              onClick={() => removeFromFavorites(record._id || record.id, record.selectedSize, record.selectedColor)}
            >
              Favorilerden Kaldır
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <section className="favorites-page">
      <div className="container">
        <div className="section-title">
          <h2>Favorilerim</h2>
        </div>
        
        <Table
            dataSource={favorites}
            columns={columns}
            rowKey={(record) => `${record._id || record.id}-${record.selectedSize}-${record.selectedColor}`}
            locale={{ emptyText: "Henüz favorilere eklenmiş bir ürün yok." }}
            pagination={false}
        />
      </div>
    </section>
  );
};

export default FavoritesPage;
