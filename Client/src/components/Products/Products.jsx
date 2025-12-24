import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import "./Products.css";
import { message } from "antd";

const Products = () => {
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
        if (gender) params.append("gender", gender);
        if (categoryId) params.append("categoryId", categoryId);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          message.error("Ürünler getirilemedi.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchProducts();
  }, [apiUrl, gender, categoryId]);

  const sliderSettings = {
    dots: false,
    infinite: products.length > 3, // Ürün azsa slider bozulmasın
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 520, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Ürünler</h2>
        </div>
        <div className="product-wrapper product-carousel">
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <ProductItem productItem={product} key={product._id || product.id} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Products;