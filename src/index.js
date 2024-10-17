import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Login from "./Login";
import Home from "./Home";
import Checkout from "./Checkout";
import Register from "./Bài 32/Register";
import BlogList from "./Component/Blog/BlogList";
import BlogDetails from "./Component/Blog/BlogDetails";
import Index from "./Component/Member/Index";
import Update from "./Component/Member/Update";
import AddProduct from "./Component/Member/AddProduct";
import MyProduct from "./Component/Member/MyProduct";
import "@fortawesome/fontawesome-free/css/all.min.css";
import EditProduct from "./Component/Member/EditProduct";
import Cart from "./Component/Member/Cart";
import ProductDetail from "./Component/Member/ProductDetail";
import Wishlist from "./Component/Product/Wishlist";
import { Provider } from "react-redux";
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <App /> */}
      <Router>
        <App>
          <Routes>
            <Route index path="/home" element={<Home />} />
            <Route path="/Login" element={<Index />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Bloglist" element={<BlogList />} />
            <Route path="/detail/:id" element={<BlogDetails />} />
            <Route path="account" element={<Update />} />
            <Route path="/account/product" element={<AddProduct />} />
            <Route path="/account/my-product" element={<MyProduct />} />
            <Route path="/account/edit-product" element={<EditProduct />} />
            <Route path="/ProductDetail" element={<ProductDetail />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Wishlist" element={<Wishlist />} />
          </Routes>
        </App>
      </Router>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
