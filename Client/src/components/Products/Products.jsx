import ProductItem from "./ProductItem";
import "./Products.css";

const Products = () => {
  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Öne Çıkanlar</h2>
        </div>
        <div className="product-wrapper product-carousel">
          <div className="glide__track">
            <ul className="product-list glide__slides" id="product-list">
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
            </ul>
          </div>
          <div className="glide__arrows">
            <button className="glide__arrow glide__arrow--left">
              <i className="bi bi-chevron-left"></i>
            </button>
            <button className="glide__arrow glide__arrow--right">
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;