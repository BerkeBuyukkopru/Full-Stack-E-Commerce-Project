import React from "react";

import Sliders from "../components/Slider/Sliders";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import Blogs from "../components/Blogs/Blogs";

const HomePage = () => {
  return (
    <React.Fragment>
      <Sliders />
      <Categories />
      <Products />
      <Blogs />
    </React.Fragment>
  );
};

export default HomePage;
