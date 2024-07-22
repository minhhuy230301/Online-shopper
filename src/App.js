import Checkout from "./Checkout";
import Footer from "./Footer";
import Head from "./Head";
import Home from "./Home";
import Login from "./Login";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Warning from "./Bai11/Warning";
import ObjA from "./Bài 31/ObjA";
import ObjB from "./Bài 31/ObjB";

import BlogList from "./Component/Blog/BlogList";
import MenuLeft from "./Component/MenuLeft";
import Update from "./Component/Member/Update";
import AddProduct from "./Component/Member/AddProduct";
import MenuLeftAccount from "./Component/Member/MenuLeftAccount";
import { UserContext } from "./UserContext";
import NumberList from "./Bài 12/NumberList";
import { useState } from "react";
function App(props) {
  let param1 = useLocation();
  const [qty, setQty] = useState(0);
  const [qty1, setQty1] = useState(0);
  const user = { huy: 1, class: 23 };
  function loginContext(data) {
    setQty(data);
  }
  return (
    <UserContext.Provider
      value={{
        qty: qty,
        loginContext: loginContext,
      }}
    >
      <div>
        <Head />
        <section>
          <div className="container">
            <div className="row">
              <div>
                {param1["pathname"].includes("home") ||
                param1["pathname"].includes("Cart") ? null : param1[
                    "pathname"
                  ].includes("account") ? (
                  <MenuLeftAccount />
                ) : (
                  <MenuLeft />
                )}

                {props.children}
              </div>

              {/* <BlogList /> */}
            </div>
          </div>
        </section>

        <Footer />

        {/* <Link to="/Bai31">Bài 31-</Link>
      <Link to="/Mailbox">Mailbox-</Link>
      <Link to="/NumberList">NumberList-</Link>
      <Link to="/bai13">Bài 13-</Link>
      <Link to="Bai32">Bai 32-</Link>
      <Link to="/Bai32(2)">Bài 32(2)-</Link>
      <Link to="/Bai18">Bài 18-</Link>
      <Link to="/Bai18(2)">Bài 18(2)</Link> */}
      </div>
    </UserContext.Provider>
  );
}
export default App;
