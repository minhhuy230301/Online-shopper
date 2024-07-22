import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function ProductDetail(props) {
  const [getData, setData] = useState("");
  const [getIdMember, setIdMember] = useState("");
  const [getData2, setData2] = useState({
    category: "",
    brand: "",
  });
  const [show, setShow] = useState(false);
  const [image, setIamge] = useState("");
  useEffect(() => {
    var userData = localStorage.getItem("info1");
    userData = JSON.parse(userData);
    setIdMember(userData);
    axios
      .get("http://localhost:8080/laravel/laravel/public/api/category-brand")
      .then((res) => {
        setData2({
          category: res.data.category,
          brand: res.data.brand,
        });
      });
  }, []);
  useEffect(() => {
    var IdProduct = localStorage.getItem("IdProduct");
    IdProduct = JSON.parse(IdProduct);
    // console.log(IdProduct);
    axios
      .get(
        "http://localhost:8080/laravel/laravel/public/api/product/detail/" +
          IdProduct
      )
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      });
    // console.log(getData.name);
  }, []);
  const handleShow = (e) => {
    setShow(!show);
  };
  function NewAndSale() {
    if (Object.keys(getData).length > 0) {
      if (getData.status == 0) {
        return (
          <>
            <img
              src="images/product-details/new.jpg"
              className="newarrival"
              alt=""
            />
          </>
        );
      } else {
        return (
          <>
            <img
              src="images/product-details/sale.jpg"
              className="newarrival"
              alt=""
            />
          </>
        );
      }
    }
  }
  function ProductNewAndSale() {
    if (Object.keys(getData).length > 0) {
      if (getData.status == 0) {
        return (
          <>
            <p>
              <b>Condition:</b> New
            </p>
          </>
        );
      } else {
        return (
          <>
            <p>
              <b>Condition: Sale</b> {getData.sale} %
            </p>
          </>
        );
      }
    }
  }
  function Smallimg() {
    let img = JSON.parse(getData.image);
    if (img.length > 0) {
      return img.map((value, key) => {
        return (
          <>
            <div
              className="carousel-inner"
              // style={{
              //   display: "inline-block",
              //   width: "400px",
              //   margin: "10px",
              // }}
            >
              <div className="item active">
                <a href>
                  <img
                    style={{
                      width: "60px",

                      display: "inline-block",
                      border: "0",
                      verticalAlign: "middle",
                      margin: " 5px 10px",
                    }}
                    src={
                      "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                      getIdMember.Auth.id +
                      "/" +
                      value
                    }
                    alt=""
                  />
                </a>
              </div>
            </div>
          </>
        );
      });
    }
  }
  function Details() {
    if (Object.keys(getData).length > 0) {
      let img = JSON.parse(getData.image);
      // setIamge(img);
      return (
        <>
          <div className="product-details">
            {/*product-details*/}
            <div className="col-sm-5">
              <div className="view-product">
                {/* <img src="images/product-details/1.jpg" alt="" /> */}
                <img
                  src={
                    "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                    getIdMember.Auth.id +
                    "/" +
                    img[0]
                  }
                  alt=""
                />
                <a
                  // href="images/product-details/1.jpg"
                  // href={
                  //   "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                  //   getIdMember.Auth.id +
                  //   "/" +
                  //   img[0]
                  // }
                  // rel="prettyPhoto"
                  onClick={handleShow}
                >
                  <h3>ZOOM</h3>
                </a>
                {/* <a>
                  <h3>ZOOM</h3>
                </a> */}
              </div>
              <div
                id="similar-product"
                className="carousel slide"
                data-ride="carousel"
                style={{ display: "flex" }}
              >
                <a
                  className="left item-control"
                  href="#similar-product"
                  data-slide="prev"
                >
                  <i className="fa fa-angle-left" />
                </a>
                {/* Wrapper for slides */}
                {/* <div className="carousel-inner">
                  <div className="item active">
                    <a href>
                      <img
                        style={{
                          width: "60px",
                          marginLeft: "0",
                          display: "inline-block",
                          border: "0",
                          verticalAlign: "middle",
                        }}
                        src={
                          "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                          getIdMember.Auth.id +
                          "/" +
                          img[0]
                        }
                        alt=""
                      />
                    </a>
                    <a href>
                      <img
                        style={{
                          width: "60px",
                          marginLeft: "0",
                          display: "inline-block",
                          border: "0",
                          verticalAlign: "middle",
                        }}
                        src={
                          "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                          getIdMember.Auth.id +
                          "/" +
                          img[0]
                        }
                        alt=""
                      />
                    </a>
                    <a href>
                      <img
                        style={{
                          width: "60px",
                          marginLeft: "0",
                          display: "inline-block",
                          border: "0",
                          verticalAlign: "middle",
                        }}
                        src={
                          "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                          getIdMember.Auth.id +
                          "/" +
                          img[0]
                        }
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="item">
                    <a href>
                      <img
                        style={{
                          width: "60px",
                          marginLeft: "0",
                          display: "inline-block",
                          border: "0",
                          verticalAlign: "middle",
                        }}
                        src={
                          "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                          getIdMember.Auth.id +
                          "/" +
                          img[0]
                        }
                        alt=""
                      />
                    </a>
                    <a href>
                      <img
                        style={{
                          width: "60px",
                          marginLeft: "0",
                          display: "inline-block",
                          border: "0",
                          verticalAlign: "middle",
                        }}
                        src={
                          "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                          getIdMember.Auth.id +
                          "/" +
                          img[0]
                        }
                        alt=""
                      />
                    </a>
                    <a href>
                      <img
                        style={{
                          width: "60px",
                          marginLeft: "0",
                          display: "inline-block",
                          border: "0",
                          verticalAlign: "middle",
                        }}
                        src={
                          "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                          getIdMember.Auth.id +
                          "/" +
                          img[0]
                        }
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="item">
                    <a href>
                      <img
                        style={{
                          width: "60px",
                          marginLeft: "0",
                          display: "inline-block",
                          border: "0",
                          verticalAlign: "middle",
                        }}
                        src={
                          "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                          getIdMember.Auth.id +
                          "/" +
                          img[0]
                        }
                        alt=""
                      />
                    </a>
                    <a href>
                      <img
                        style={{
                          width: "60px",
                          marginLeft: "0",
                          display: "inline-block",
                          border: "0",
                          verticalAlign: "middle",
                        }}
                        src={
                          "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                          getIdMember.Auth.id +
                          "/" +
                          img[0]
                        }
                        alt=""
                      />
                    </a>
                    <a href>
                      <img
                        style={{
                          width: "60px",
                          marginLeft: "0",
                          display: "inline-block",
                          border: "0",
                          verticalAlign: "middle",
                        }}
                        src={
                          "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                          getIdMember.Auth.id +
                          "/" +
                          img[0]
                        }
                        alt=""
                      />
                    </a>
                  </div>
                </div> */}
                {Smallimg()}
                {/* Controls */}
                <a
                  className="right item-control"
                  href="#similar-product"
                  data-slide="next"
                >
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="product-information">
                {/*/product-information*/}
                {/* <img
                  src="images/product-details/new.jpg"
                  className="newarrival"
                  alt=""
                /> */}
                {NewAndSale()}
                <h2>{getData.name}</h2>
                <p>Web ID: {getData.id}</p>
                <img src="images/product-details/rating.png" alt="" />
                <span>
                  <span>US ${getData.price}</span>
                  <label>Quantity:</label>
                  <input type="text" defaultValue={3} />
                  <button type="button" className="btn btn-fefault cart">
                    <i className="fa fa-shopping-cart" />
                    Add to cart
                  </button>
                </span>
                <p>
                  <b>Availability:</b> In Stock
                </p>
                {ProductNewAndSale()}
                {/* <p>
                  <b>Condition:</b> New
                </p> */}
                <p>
                  <b>Brand:</b> {getData.brand}
                </p>
                <a href>
                  <img
                    src="images/product-details/share.png"
                    className="share img-responsive"
                    alt=""
                  />
                </a>
              </div>
              {/*/product-information*/}
            </div>
          </div>
        </>
      );
    }
  }
  return (
    <>
      <div className="col-sm-9 padding-right">
        {show ? (
          <>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {/* <img
                  src={
                    "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                    getIdMember.Auth.id +
                    "/" +
                    image[0]
                  }
                  alt=""
                /> */}
              </Modal.Body>

              <Modal.Footer></Modal.Footer>
            </Modal.Dialog>
          </>
        ) : null}

        {Details()}

        {/*/product-details*/}
        <div className="category-tab shop-details-tab">
          {/*category-tab*/}
          <div className="col-sm-12">
            <ul className="nav nav-tabs">
              <li>
                <a href="#details" data-toggle="tab">
                  Details
                </a>
              </li>
              <li>
                <a href="#companyprofile" data-toggle="tab">
                  Company Profile
                </a>
              </li>
              <li>
                <a href="#tag" data-toggle="tab">
                  Tag
                </a>
              </li>
              <li className="active">
                <a href="#reviews" data-toggle="tab">
                  Reviews (5)
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade" id="details">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery4.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="companyprofile">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery4.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="tag">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery4.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade active in" id="reviews">
              <div className="col-sm-12">
                <ul>
                  <li>
                    <a href>
                      <i className="fa fa-user" />
                      EUGEN
                    </a>
                  </li>
                  <li>
                    <a href>
                      <i className="fa fa-clock-o" />
                      12:41 PM
                    </a>
                  </li>
                  <li>
                    <a href>
                      <i className="fa fa-calendar-o" />
                      31 DEC 2014
                    </a>
                  </li>
                </ul>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
                <p>
                  <b>Write Your Review</b>
                </p>
                <form action="#">
                  <span>
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Email Address" />
                  </span>
                  <textarea name defaultValue={""} />
                  <b>Rating: </b>{" "}
                  <img src="images/product-details/rating.png" alt="" />
                  <button type="button" className="btn btn-default pull-right">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/*/category-tab*/}
        <div className="recommended_items">
          {/*recommended_items*/}
          <h2 className="title text-center">recommended items</h2>
          <div
            id="recommended-item-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="item active">
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="left recommended-item-control"
              href="#recommended-item-carousel"
              data-slide="prev"
            >
              <i className="fa fa-angle-left" />
            </a>
            <a
              className="right recommended-item-control"
              href="#recommended-item-carousel"
              data-slide="next"
            >
              <i className="fa fa-angle-right" />
            </a>
          </div>
        </div>
        {/*/recommended_items*/}
      </div>
      <div class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
