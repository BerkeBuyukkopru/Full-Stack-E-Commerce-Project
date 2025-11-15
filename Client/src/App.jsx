import "./App.css";
import Categories from "./components/Categories/Categories";
import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import Slider from "./components/Slider/Sliders";

function App() {
  return (
    <>
      <Header />
      <Slider />
      <Categories/>
      <Footer />
    </>
  );
}

export default App;
