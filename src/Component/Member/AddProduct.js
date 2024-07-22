import axios from "axios";
import { useEffect, useState } from "react";
import Error from "../../Bài 13/Error";
import MenuLeftAccount from "./MenuLeftAccount";
import Update from "./Update";
import { Navigate, useNavigate } from "react-router-dom";
function AddProduct(props) {
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
  });
  const [getfile, setFile] = useState("");
  const [getAvatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const [CategoryId, getCategoryId] = useState("");
  const [BrandId, getBrandId] = useState("");
  const [ShowSale, setShowSale] = useState(0);
  const [getData, setData] = useState("");
  const [Img, setImg] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    var userData = localStorage.getItem("info1");
    userData = JSON.parse(userData);
    setData(userData);
    axios
      .get("http://localhost:8080/laravel/laravel/public/api/category-brand")
      .then((res) => {
        setInputs({
          category: res.data.category,
          brand: res.data.brand,
          name: "",
          price: "",
          company: "",
          detail: "",
          status: "",
          sale: "",
          file: "",
        });
      });
  }, []);
  const handleInput = (e) => {
    //function dùng chung cho các thẻ input,textarea,...
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  function IsImg() {
    Object.keys(getfile).map((value, key) => {
      const typeImg = ["png", " jpg", "jpeg", "PNG", "JPG"];
      var img_val = getfile[value]["type"].lastIndexOf("/") + 1;
      var checkImg = getfile[value]["type"].substring(img_val);
      var result = typeImg.includes(checkImg);
      if (!result) {
        return false;
      } else {
        return true;
      }
    });
    // console.log(checkImg);
    // var img_val = getfile.type.lastIndexOf("/") + 1;
    // var checkImg = getfile.type.substring(img_val);

    // console.log(Object.keys(getfile).length);
    // console.log(getfile);
  }
  function handleUserInputFile(e) {
    const file = e.target.files;
    setFile(file);

    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      // setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
  }

  const getIdCategory = (e) => {
    getCategoryId(e.target.value);
    // console.log(e.target.value);
  };
  const getIdBrand = (e) => {
    getBrandId(e.target.value);
    // console.log(e.target.value);
  };
  function Category() {
    if (inputs.category.length > 0) {
      return inputs.category.map((value, key) => {
        // console.log(value.id);
        return (
          <>
            <option value={value.id}>{value.category}</option>;
          </>
        );
      });
    }
  }
  function Brand() {
    if (inputs.brand.length > 0) {
      return inputs.brand.map((value, key) => {
        return (
          <>
            <option value={value.id}>{value.brand}</option>;
          </>
        );
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;
    if (inputs.name == "") {
      flag = false;
      errorSubmit.name = "Vui lòng nhập tên";
    }
    if (inputs.price == "") {
      flag = false;
      errorSubmit.price = "Vui lòng nhập giá";
    }
    if (CategoryId == "") {
      flag = false;
      errorSubmit.category = "Vui lòng nhập Category";
    }
    if (BrandId == "") {
      flag = false;
      errorSubmit.brand = "Vui lòng nhập Brand";
    }
    if (inputs.company == "") {
      flag = false;
      errorSubmit.company = "Vui lòng nhập Company";
    }
    if (Object.keys(getfile).length > 0) {
      if (Object.keys(getfile).length > 3) {
        flag = false;
        errorSubmit.file = "Chỉ được upload 3 file";
      }
      Object.keys(getfile).map((value, key) => {
        // if () {
        //   flag = false;
        //   errorSubmit.file = "Vui lòng chọn file";
        // } else
        if (getfile[value]["size"] > 1024 * 1024) {
          flag = false;
          errorSubmit.file = "File vượt quá 1mb";
        }
        const typeImg = ["png", " jpg", "jpeg", "PNG", "JPG"];
        var img_val = getfile[value]["type"].lastIndexOf("/") + 1;
        var checkImg = getfile[value]["type"].substring(img_val);
        var result = typeImg.includes(checkImg);
        if (!result) {
          flag = false;
          errorSubmit.file = "File này không phải ảnh";
        }
      });
    } else {
      flag = false;
      errorSubmit.file = "Vui lòng chọn file";
    }
    if (inputs.detail == "") {
      flag = false;
      errorSubmit.detail = "Vui lòng nhập Detail";
    }
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});
      console.log(getfile);
      let url =
        "http://localhost:8080/laravel/laravel/public/api/user/add-product";

      let accessToken = getData.success.token;
      //   console.log(accessToken);
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      console.log(getfile);
      const formData = new FormData();
      formData.append("name", inputs.name);
      formData.append("price", inputs.price);
      formData.append("category", CategoryId);
      formData.append("brand", BrandId);
      formData.append("company", inputs.company);
      formData.append("detail", inputs.detail);
      formData.append("status", ShowSale ? 1 : 0);
      formData.append("sale", inputs.sale);
      formData.append("price", inputs.price);
      Object.keys(getfile).map((item, i) => {
        formData.append("file[]", getfile[item]);
      });
      axios.post(url, formData, config).then((res) => {
        console.log(res.data);
        console.log(res.data.errors);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          alert("Tạo sản phẩm thành công");
          navigate("/account/my-product");
        }
      });
    }
  };
  return (
    <>
      {/* <Update /> */}
      {/* <MenuLeftAccount /> */}
      <div className="col-sm-4">
        <div className="signup-form">
          {/*sign up form*/}
          <h2>Creat Product</h2>
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
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={inputs.price}
              onChange={handleInput}
            />
            <select name="category" onChange={getIdCategory}>
              <option value="">Please choose Category</option>
              {Category()}
            </select>

            <select name="brand" onChange={getIdBrand}>
              <option value="">Please choose brand</option>
              {Brand()}
            </select>
            <select name="status" onChange={() => setShowSale(!ShowSale)}>
              <option value="1">New</option>
              <option value="0">Sale</option>
            </select>
            {ShowSale ? (
              <>
                <input
                  type="number"
                  name="sale"
                  value={inputs.sale}
                  onChange={handleInput}
                />
              </>
            ) : null}
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
              multiple
              onChange={handleUserInputFile}
            />
            <textarea
              name="detail"
              rows={20}
              defaultValue={""}
              placeholder="Detail"
              value={inputs.detail}
              onChange={handleInput}
            />
            <button type="submit" className="btn btn-default">
              Create
            </button>
          </form>
          <Error errors={errors} />
        </div>
      </div>
    </>
  );
}

export default AddProduct;
