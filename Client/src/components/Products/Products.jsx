import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import "./Products.css";
import { message } from "antd";

const Products = ({ isHome }) => {
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [searchParams] = useSearchParams();

  const gender = searchParams.get("gender");
  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${apiUrl}/product`;
        
        // Query params oluşturma
        const params = new URLSearchParams();
        if (gender && !isHome) params.append("gender", gender);
        if (categoryId && !isHome) params.append("categoryId", categoryId);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          // isHome ise "En Yeniler" mantığı: Ters çevir (varsayılan mongo ID sırası genelde eklendiği tarihtir) ve ilk 4'ü al
          if (isHome) {
              // Eğer backend zaten "createdAt" sıralı dönüyorsa direkt reverse, değilse id'ye göre basit bir varsayım veya client-side sort
              // MongoDB objectId genelde zamana göre artar, bu yüzden tersten sondan eklenenler gelir.
              const newestProducts = [...data].reverse().slice(0, 4);
              setProducts(newestProducts);
          } else {
              setProducts(data);
          }
        } else {
          message.error("Ürünler getirilemedi.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchProducts();
  }, [apiUrl, gender, categoryId, isHome]);

  // Başlık belirleme
  let pageTitle = "Ürünler";
  if (isHome) {
      pageTitle = "En Yeniler";
  } else if (gender === "Man") {
      pageTitle = "Erkek Ürünleri";
  } else if (gender === "Woman") {
      pageTitle = "Kadın Ürünleri";
  }

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>{pageTitle}</h2>
        </div>
        <div className="product-wrapper product-grid">
            {products.map((product) => (
              <ProductItem productItem={product} key={product._id || product.id} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Products;