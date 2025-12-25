import React from "react";

import Sliders from "../components/Slider/Sliders";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import Blogs from "../components/Blogs/Blogs";
import FooterPromotion from "../components/FooterPromotion/FooterPromotion";

const HomePage = () => {
  return (
    <React.Fragment>
      <Sliders />
      <Categories />
      <Products isHome={true} />
      <Blogs isHome={true} />
      <FooterPromotion/>
    </React.Fragment>
  );
};

export default HomePage;
