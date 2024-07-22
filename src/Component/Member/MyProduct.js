import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation, NavLink } from "react-router-dom";
import MenuLeft from "../MenuLeft";
import MenuLeftAccount from "./MenuLeftAccount";
import { Navigate, useNavigate } from "react-router-dom";
import EditProduct from "./EditProduct";
// export const Edit = (e) => {
//   console.log(e.target.id);
// };
// export { getEdit };
function MyProduct(props) {
  const [product, setProduct] = useState("");
  const [DeleteProduct, setDeleteProduct] = useState("");
  const [getData, setData] = useState("");
  const [click, setClick] = useState(true);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(0);
  useEffect(() => {
    var userData = localStorage.getItem("info1");
    userData = JSON.parse(userData);
    setData(userData);
    let accessToken = userData.success.token;
    //   console.log(accessToken);
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios
      .get(
        "http://localhost:8080/laravel/laravel/public/api/user/my-product",
        config
      )
      .then((res) => {
        console.log(res.data.data);
        setProduct(res.data.data);
      });
  }, []);
  const Delete1 = (e) => {
    // console.log(e.target.id);
    setDeleteProduct(e.target.id);
    console.log(DeleteProduct);
    let accessToken = getData.success.token;
    //   console.log(accessToken);
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    let url =
      "http://localhost:8080/laravel/laravel/public/api/user/delete-product/" +
      e.target.id;

    axios.get(url, config).then((res) => {
      console.log(res.data);
      setProduct(res.data.data);
    });
  };
  const Edit = (e) => {
    // console.log(e.target.id);

    localStorage.setItem("idEdit", JSON.stringify(e.target.id));
  };

  function tableProduct() {
    if (Object.keys(product).length > 0) {
      return Object.keys(product).map((value, key) => {
        let img = JSON.parse(product[value]["image"]);
        if (product[value]["sale"]) {
          return (
            <>
              <tbody>
                <tr>
                  <td
                    className="cart_product"
                    id={product[value]["id"]}
                    onClick={Delete1}
                  >
                    {product[value]["id"]}
                  </td>
                  <td className="cart_description">
                    <h4>
                      <a href>{product[value]["name"]}</a>
                    </h4>
                  </td>
                  <td class="cart_product">
                    <a href="">
                      <img
                        // src={
                        //   "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                        //   getData.Auth.id +
                        //   "/" +
                        //   img[0]
                        // }
                        alt=""
                      />
                    </a>
                  </td>
                  <td className="cart_price">
                    <p>
                      $
                      {product[value]["price"] -
                        product[value]["price"] *
                          (parseInt(product[value]["sale"]) / 100)}
                    </p>
                  </td>
                  {/* edit */}
                  <td>
                    <Link to="/account/edit-product">
                      <i
                        id={product[value]["id"]}
                        onClick={Edit}
                        class="fas fa-edit"
                      ></i>
                    </Link>
                  </td>
                  {/* delete */}
                  <td>
                    <a>
                      <i
                        id={product[value]["id"]}
                        onClick={Delete1}
                        class="fas fa-times-circle"
                      ></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </>
          );
        } else {
          return (
            <>
              <tbody>
                <tr>
                  <td className="cart_product">{product[value]["id"]}</td>
                  <td className="cart_description">
                    <h4>
                      <a href>{product[value]["name"]}</a>
                    </h4>
                  </td>
                  <td class="cart_product">
                    <a href="">
                      <img
                        // src={
                        //   "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                        //   getData.Auth.id +
                        //   "/" +
                        //   img[0]
                        // }
                        alt=""
                      />
                    </a>
                  </td>
                  <td className="cart_price">
                    <p>${product[value]["price"]}</p>
                  </td>
                  {/* edit */}
                  <td>
                    <Link to="/account/edit-product">
                      <i
                        id={product[value]["id"]}
                        onClick={Edit}
                        class="fas fa-edit"
                      ></i>
                    </Link>
                  </td>
                  {/* delete */}
                  <td>
                    <a>
                      <i
                        id={product[value]["id"]}
                        onClick={Delete1}
                        class="fas fa-times-circle"
                      ></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </>
          );
        }
      });
    }
  }
  return (
    <>
      {/* <MenuLeftAccount /> */}
      <div className="col-sm-4">
        <section id="cart_items">
          <div class="container">
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="id">Id</td>
                    <td className="name">Name</td>
                    <td className="img">Image</td>
                    <td className="price">Price</td>
                    <td className="action">Action</td>
                    <td></td>
                  </tr>
                </thead>

                {tableProduct()}
              </table>
            </div>
            <Link to="/account/product">
              <button
                type="submit"
                className="btn btn-default"
                style={{ float: "right", backgroundColor: "#FE980F" }}
              >
                Add New
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
export default MyProduct;
