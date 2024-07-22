import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useLocation, NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";
function Wishlist() {
  const [getData, setData] = useState("");
  const [getIdMember, setIdMember] = useState("");
  var wishlist = localStorage.getItem("WishList");
  wishlist = JSON.parse(wishlist);
  console.log(wishlist);
  const value1 = useContext(UserContext);
  useEffect(() => {
    var userData = localStorage.getItem("info1");
    userData = JSON.parse(userData);
    setIdMember(userData);
    axios
      .get("http://localhost:8080/laravel/laravel/public/api/product/wishlist")
      .then((res) => {
        setData(res.data.data);
      });
  }, []);
  function AddToCart(e) {
    // console.log(e.target.id);
    var cart = {};
    var a = 1;
    var b = 0;
    var addCart = localStorage.getItem("Carttt");
    if (addCart) {
      cart = JSON.parse(addCart);
      Object.keys(cart).map(function (value, key) {
        if (value == e.target.id) {
          cart[e.target.id] += 1;
          a = 2;
        }
        b += cart[value];
      });
    }
    if (a == 1) {
      cart[e.target.id] = 1;
    }
    value1.loginContext(b);
    localStorage.setItem("Carttt", JSON.stringify(cart));
    localStorage.setItem("QuantyInCart", JSON.stringify(b));
  }
  function DeleteWishList(e) {
    let xx = [...getData];
    if (xx.length > 0) {
      xx.map((value, key) => {
        if (value.id == e.target.id) {
          xx.splice([key], 1);
        }
      });
    }
    console.log(xx);
    setData(xx);
    if (wishlist.length > 0) {
      wishlist.map((value, key) => {
        if (e.target.id == value) {
          wishlist.splice([key], 1);
        }
      });
    }
    localStorage.setItem("WishList", JSON.stringify(wishlist));
  }
  function ProductWishlist() {
    if (getData.length > 0) {
      return getData.map((value, key) => {
        if (wishlist.length > 0) {
          return wishlist.map((value2, key2) => {
            if (value2 == value.id) {
              let img = JSON.parse(value.image);
              return (
                <>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center" id="produc1">
                          <img
                            src={
                              "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                              getIdMember.Auth.id +
                              "/" +
                              img[0]
                            }
                            alt=""
                          />
                          <h2>${value.price}</h2>
                          <p>{value.name}</p>
                          <a className=" btn btn-default add-to-cart">
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                          </a>
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <a
                              to="/ProductDetail"
                              className=" btn btn-default add-to-cart"
                              id={value.id}
                              onClick={DeleteWishList}
                            >
                              Delete WishList
                            </a>
                            <h2>${value.price}</h2>
                            <p>{value.name}</p>
                            <a
                              id={value.id}
                              onClick={AddToCart}
                              className=" btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="choose">
                        <ul className="nav nav-pills nav-justified">
                          <li>
                            <a
                              id={value.id}
                              name="wishlist"
                              //   onClick={Wishlist1}
                            >
                              <i className="fa fa-plus-square" />
                              Add to wishlist
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <i className="fa fa-plus-square" />
                              Add to compare
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          });
        } else {
          return <>abc</>;
        }
      });
    } else {
      return <>abc</>;
    }
  }
  return <>{ProductWishlist()}</>;
}
export default Wishlist;
