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
import Bai11vidu from "./Bai11/Bai11vidu";
import Mailbox from "./Bai11/Mailbox";
import Warning from "./Bai11/Warning";
import Fix from "./Bai11/Fix";
import NumberList from "./Bài 12/NumberList";
import RouteBai11 from "./Bai11/RouteBai11";
import Bai11 from "./Bai11/Bai11";
import ObjA from "./Bài 31/ObjA";
import ObjB from "./Bài 31/ObjB";
import Form from "./Bài 13/Form";
import Register from "./Bài 32/Register";
import SexSelection from "./Bài 32/SexSelection";
import LoginAndRegister from "./Bài 32(2)/LoginAndRegister";
import GetRequest from "./Bài 18/GetRequest";
import PostRequest from "./Bài 18/PostRequest";
import DeleteRequest from "./Bài 18/DeleteRequest";
import Bai1SetData from "./Bài 18/Bai1SetData";
import Bai2SetData from "./Bài 18/Bai2SetData";
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
const Messages = ["React", "Re: React", "Re:Re React"];
const number = [1, 2, 3, 4, 5];
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
            {/* <Route path="/account/my-product" element={<IndexProduct />} /> */}
            <Route path="/account/my-product" element={<MyProduct />} />
            <Route path="/account/edit-product" element={<EditProduct />} />
            <Route path="/ProductDetail" element={<ProductDetail />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            {/* <Route path="/Bai31" element={<ObjA />} />
          <Route
            path="/Mailbox"
            element={<Mailbox unreadMessages={Messages} />}
          />
          <Route path="/NumberList" element={<NumberList number={number} />} />
          <Route path="/bai13" element={<Form />} />
          <Route path="/Bai32" element={<SexSelection />} />
          <Route path="/Bai32(2)" element={<LoginAndRegister />} /> */}
            {/* <Route path="/Bai18" element={<GetRequest />} /> */}
            {/* <Route path="/Bai18" element={<PostRequest />} /> */}
            {/* <Route path="/Bai18" element={<DeleteRequest />} /> */}
            {/* <Route path="/Bai18" element={<Bai1SetData />} />
          <Route path="/Bai18(2)" element={<Bai2SetData />} /> */}
            <Route path="/Bai32" element={<Register />} />
          </Routes>
        </App>
      </Router>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
