import MyProduct from "./MyProduct";
import { Navigate, useNavigate } from "react-router-dom";
import MenuLeftAccount from "./MenuLeftAccount";
import React, {
  useContext,
  useEffect,
  useInsertionEffect,
  useState,
} from "react";
import axios from "axios";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Error from "../../Bài 13/Error";
import { UserContext } from "../../UserContext";
function EditProduct(props) {
  const navigate = useNavigate();
  let param1 = useLocation();
  const [getData, setData] = useState("");

  const [errors, setErrors] = useState({});
  const [ShowSale, setShowSale] = useState(0);
  const [getfile, setFile] = useState("");

  const [ListImg, setListImg] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  function getId(e) {
    console.log(e);
  }

  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    company: "",
    detail: "",
    status: "",
    sale: "",
    file: "",
    id_user: "",
  });
  const [inputs2, setInputs2] = useState({
    category: "",
    brand: "",
  });

  useEffect(() => {
    var userData = localStorage.getItem("info1");
    userData = JSON.parse(userData);

    setData(userData);
    axios
      .get("http://localhost:8080/laravel/laravel/public/api/category-brand")
      .then((res) => {
        setInputs2({
          category: res.data.category,
          brand: res.data.brand,
        });
      });
  }, []);

  useEffect(() => {
    var userData = localStorage.getItem("info1");
    userData = JSON.parse(userData);
    var idEdit = localStorage.getItem("idEdit");
    idEdit = JSON.parse(idEdit);
    console.log(idEdit);
    setData(userData);
    // console.log(getData.Auth.id);
    // let url =
    //   "http://localhost:8080/laravel/laravel/public/api/user/edit-product/" +
    //   edit;
    let accessToken = userData.success.token;
    //   console.log(accessToken);
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    // const formData = new FormData();
    // formData.append("name", inputs.name);
    //   formData.append("price", inputs.price);
    //   formData.append("category", CategoryId);
    //   formData.append("brand", BrandId);
    //   formData.append("company", inputs.company);
    //   formData.append("detail", inputs.detail);
    //   formData.append("status", ShowSale ? 1 : 0);
    //   formData.append("sale", inputs.sale);
    //   formData.append("price", inputs.price);
    //   Object.keys(getfile).map((item, i) => {
    //     formData.append("file[]", getfile[item]);
    //   });
    axios
      .get(
        "http://localhost:8080/laravel/laravel/public/api/user/product/" +
          idEdit,
        config
      )
      .then((res) => {
        console.log(res.data);
        setInputs({
          category: res.data.data.id_category,
          brand: res.data.data.id_brand,
          name: res.data.data.name,
          price: res.data.data.price,
          company: res.data.data.company_profile,
          detail: res.data.data.detail,
          sale: res.data.data.sale,
          file: res.data.data.image,
          id_user: res.data.data.id_user,
        });
        setShowSale({
          status: res.data.data.status,
        });
        // console.log(res.data.data.image.length);
      });
    // console.log(inputs.file.length);
  }, []);
  const selectFile = (e) => {
    const select = e.target.files;
    setFile(select);
    const selectArray = Array.from(select);
    console.log(selectArray);
    const imageArray = selectArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImage(imageArray);
  };
  const handleInput = (e) => {
    //function dùng chung cho các thẻ input,textarea,...
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  function Category() {
    if (inputs2.category.length > 0) {
      return inputs2.category.map((value, key) => {
        return (
          <>
            <option value={value.id}>{value.category}</option>;
          </>
        );
      });
    }
  }
  function Brand() {
    if (inputs2.brand.length > 0) {
      return inputs2.brand.map((value, key) => {
        return (
          <>
            <option value={value.id}>{value.brand}</option>;
          </>
        );
      });
    }
  }
  // const getIdCategory = (e) => {
  //   getCategoryId(e.target.value);
  //   // console.log(e.target.value);
  // };
  // const getIdBrand = (e) => {
  //   getBrandId(e.target.value);
  //   // console.log(e.target.value);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    var idEdit = localStorage.getItem("idEdit");
    idEdit = JSON.parse(idEdit);
    // console.log(getData.Auth.id);
    let url =
      "http://localhost:8080/laravel/laravel/public/api/user/edit-product/" +
      idEdit;
    let accessToken = getData.success.token;
    //   console.log(accessToken);
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("price", inputs.price);
    formData.append("category", inputs.category);
    formData.append("brand", inputs.brand);
    formData.append("company", inputs.company);
    formData.append("detail", inputs.detail);
    formData.append("status", ShowSale == 1 ? 0 : 1);
    formData.append("sale", ShowSale == 1 ? 0 : inputs.sale);
    formData.append("price", inputs.price);
    Object.keys(ListImg).map((item, i) => {
      formData.append("avatarCheckBox[]", ListImg[item]);
    });
    Object.keys(getfile).map((item, i) => {
      formData.append("file[]", getfile[item]);
    });

    axios.post(url, formData, config).then((res) => {
      console.log(res.data);
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        alert("Cập nhật sản phẩm thành công");
        navigate("/account/my-product");
      }
    });
  };
  const ImgClick = (e) => {
    console.log(e.target.id);
    // e.preventDefault();
    var ArrayImg = ListImg;
    const value = e.target.id;
    const nameInput = e.target.name;
    if (nameInput == "avatarCheckbox") {
      if (e.target.checked) {
        ArrayImg.push(value);
        setListImg(ArrayImg);
      } else {
        let check = ListImg.indexOf(value);
        console.log(check);
        if (check > -1) {
          ListImg.splice(check, 1);
        }
      }
    } else {
      // setListImg((state) => [...state, value]);
    }

    console.log(ListImg);
    // console.log(ArrayImg);
  };

  function ImgList() {
    if (inputs.file.length > 0) {
      return inputs.file.map((value, key) => {
        // console.log(value);
        return (
          <>
            <label>
              <img
                style={{ marginLeft: "10px" }}
                src={
                  "http://localhost:8080/laravel/laravel/public/upload/user/product/" +
                  inputs.id_user +
                  "/" +
                  value
                }
                alt=""
              />
              <input
                type="checkbox"
                name="avatarCheckbox"
                id={value}
                onClick={ImgClick}
              ></input>
            </label>
          </>
        );
      });
    }
  }
  return (
    <>
      {/* {param1["pathname"].includes("/my-product") ? (
        <MyProduct idEdit={getId} />
      ) : null} */}
      {/* <MyProduct idEdit={getId} /> */}
      <div className="col-sm-4">
        <div className="signup-form">
          {/*sign up form*/}
          <h2>Edit Product</h2>
          <form
            action="#"
            encType="multipart/form-data"
            id="create-product"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={inputs.name}
              onChange={handleInput}
            />
            <select
              value={inputs.category}
              name="category"
              onChange={handleInput}
            >
              <option value="">Please choose Category</option>
              {Category()}
            </select>

            <select value={inputs.brand} name="brand" onChange={handleInput}>
              <option value="">Please choose brand</option>
              {Brand()}
            </select>
            {ShowSale != 1 ? (
              <>
                <select
                  value={0}
                  name="status"
                  onChange={() => setShowSale(!ShowSale)}
                >
                  <option value="1">New</option>
                  <option value="0">Sale</option>
                </select>
                <input
                  type="number"
                  name="sale"
                  value={inputs.sale}
                  onChange={handleInput}
                />
              </>
            ) : (
              <select
                value={1}
                name="status"
                onChange={() => setShowSale(!ShowSale)}
              >
                <option value="1">New</option>
                <option value="0">Sale</option>
              </select>
            )}
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={inputs.company}
              onChange={handleInput}
            />
            <input
              type="file"
              id="files"
              name="file"
              // value={inputs.file}
              multiple
              // onChange={handleUserInputFile}
              onChange={selectFile}
            />
            <div className="image">
              {selectedImage &&
                selectedImage.map((value, key) => {
                  return (
                    <div className="image" key={value}>
                      <label>
                        <img style={{ marginLeft: "10px" }} src={value} />
                        {Object.keys(getfile).map((value, key) => {
                          return (
                            <>
                              <input
                                type="checkbox"
                                name="avatarCheckbox"
                                id={getfile[value]["name"]}
                                onClick={ImgClick}
                              ></input>
                            </>
                          );
                        })}
                      </label>
                    </div>
                  );
                })}
            </div>
            {ImgList()}
            <textarea
              name="detail"
              rows={20}
              defaultValue={""}
              placeholder="Detail"
              value={inputs.detail}
              onChange={handleInput}
            />
            <button type="submit" className="btn btn-default">
              Update
            </button>
          </form>
          <Error errors={errors} />
        </div>
      </div>
      {/* <div className="col-sm-4">
        <MyProduct idEdit={getId} />;
      </div> */}
    </>
  );
}
export default EditProduct;
