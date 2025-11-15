import "./App.css";
import Categories from "./components/Categories/Categories";
import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import Products from "./components/Products/Products";
import Slider from "./components/Slider/Sliders";
import "./App.css"
import Blogs from "./components/Blogs/Blogs";

function App() {
  return (
    <>
      <Header />
      <Slider />
      <Categories/>
      <Products/>
      <Blogs/>
      <Footer />
    </>
  );
}

export default App;
