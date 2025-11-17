import React from "react"
import Header from "../components/Layout/Header/Header"
import Footer from "../components/Layout/Footer/Footer"
import Products from "../components/Products/Products"

const ShopPage = () => {
  return (
    <React.Fragment>
        <Header/>
        <Products/>
        <Footer/>
    </React.Fragment>
  )
}

export default ShopPage