import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";

function Cart() {
  const [getData, setData] = useState("");
  const [getIdMember, setIdMember] = useState("");
  const [count, setCount] = useState(0);
  var cart = localStorage.getItem("Carttt");
  cart = JSON.parse(cart);
  const value1 = useContext(UserContext);
  var totalAll = 0;
  var qtyAll = 0;
  useEffect(() => {
    var userData = localStorage.getItem("info1");
    userData = JSON.parse(userData);
    setIdMember(userData);
    setCount(cart);
    console.log(count[58]);
    axios
      .post(
        "http://localhost:8080/laravel/laravel/public/api/product/cart",
        cart
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      });
    // console.log(getData);
  }, []);

  const Plus = (e) => {
    let xx = [...getData];
    xx.map((value, key) => {
      if (value.id == e.target.id) {
        xx[key]["qty"] += 1;
      }
    });
    setData(xx);

    if (cart) {
      Object.keys(cart).map(function (value, key) {
        console.log(cart[e.target.id]);
        if (value == e.target.id) {
          cart[e.target.id] += 1;
        }
      });
    }
    localStorage.setItem("Carttt", JSON.stringify(cart));
    // CartTable();
    // tongAll();
  };
  const Minus = (e) => {
    console.log(e.target.id);
    let xx = [...getData];
    xx.map((value, key) => {
      if (value.id == e.target.id) {
        xx[key]["qty"] -= 1;
      }
      if (xx[key]["qty"] < 1) {
        // delete xx[key];
        xx.splice([key], 1);
      }
    });
    console.log(xx);
    setData(xx);

    if (cart) {
      Object.keys(cart).map(function (value, key) {
        console.log(cart[e.target.id]);
        if (value == e.target.id) {
          cart[e.target.id] -= 1;
        }
        if (cart[e.target.id] < 1) {
          delete cart[e.target.id];
        }
      });
    }
    localStorage.setItem("Carttt", JSON.stringify(cart));
    // CartTable();
  };
  const Delete = (e) => {
    let xx = [...getData];
    // let xx = getData;
    xx.map((value, key) => {
      if (value.id == e.target.id) {
        xx.splice([key], 1);
      }
    });
    setData(xx);
    if (cart) {
      Object.keys(cart).map(function (value, key) {
        if (value == e.target.id) {
          delete cart[e.target.id];
        }
      });
    }

    localStorage.setItem("Carttt", JSON.stringify(cart));
  };

  function CartTable() {
    if (getData.length > 0) {
      return getData.map((value, key) => {
        // console.log(value);
        let img = JSON.parse(value.image);
        var total = parseInt(value.qty * value.price);

        totalAll += total;
        qtyAll += value.qty;

        value1.loginContext(qtyAll);
        localStorage.setItem("QuantyInCart", JSON.stringify(qtyAll));
        return (
          // <tbody>
          <tr id={value}>
            <td className="cart_product">
              <a href>
                <img
                  src={
                    "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                    getIdMember.Auth.id +
                    "/" +
                    img[0]
                  }
                  alt=""
                />
              </a>
            </td>
            <td className="cart_description">
              <h4>
                <a href>{value.name}</a>
              </h4>
              <p>Web ID: {value.id}</p>
            </td>
            <td className="cart_price">
              <p>${value.price}</p>
            </td>
            <td className="cart_quantity">
              <div className="cart_quantity_button">
                <a
                  className="cart_quantity_up"
                  id={value.id}
                  href
                  onClick={Plus}
                >
                  {" "}
                  +{" "}
                </a>
                <input
                  className="cart_quantity_input"
                  type="text"
                  name="quantity"
                  // defaultValue={1}
                  value={value.qty}
                  // value={count[value.id]}
                  autoComplete="off"
                  size={2}
                />
                <a
                  className="cart_quantity_down"
                  id={value.id}
                  onClick={Minus}
                  href
                >
                  {" "}
                  -{" "}
                </a>
              </div>
            </td>
            <td className="cart_total">
              <p className="cart_total_price">$ {total}</p>
            </td>
            <td className="cart_delete">
              <a className="cart_quantity_delete" href>
                <i className="fa fa-times" id={value.id} onClick={Delete} />
              </a>
            </td>
          </tr>
          // </tbody>
        );
      });
    }
  }
  localStorage.setItem("Carttt", JSON.stringify(cart));
  localStorage.setItem("QuantyInCart", JSON.stringify(qtyAll));
  return (
    <>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            {/* <a href>
              <img src />
            </a> */}
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description" />
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td className="cart_delete" />
                </tr>
              </thead>
              <tbody>{CartTable()}</tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>
                  Get Quotes
                </a>
                <a className="btn btn-default check_out" href>
                  Continue
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>
                    Cart Sub Total <span>$59</span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total <span className="allTotal">${totalAll}</span>
                  </li>
                </ul>
                <a className="btn btn-default update" href>
                  Update
                </a>
                <a className="btn btn-default check_out" href>
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Cart;
