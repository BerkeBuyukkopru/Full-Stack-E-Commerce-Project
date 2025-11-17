import { Fragment } from "react";
import Header from "../components/Layout/Header/Header";
import ProductDetail from "../components/ProductDetails/ProductDetail";
import Footer from "../components/Layout/Footer/Footer";

const ProductDetailsPage = () => {
  return (
    <Fragment>
      <Header />
      <ProductDetail />
      <Footer />
    </Fragment>
  );
};

export default ProductDetailsPage;