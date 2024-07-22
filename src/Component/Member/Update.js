import { useEffect, useState } from "react";
import Error from "../../Bài 13/Error";
import axios from "axios";
import AddProduct from "./AddProduct";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import MenuLeftAccount from "./MenuLeftAccount";
function Update(prosp) {
  const [errors, setErrors] = useState({});
  const [getfile, setFile] = useState("");
  const [getAvatar, setAvatar] = useState("");
  const [getData, setData] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    level: "0",
    avatar: "",
  });
  useEffect(() => {
    var userData = localStorage.getItem("info1");
    userData = JSON.parse(userData);
    setInputs({
      name: userData.Auth.name,
      phone: userData.Auth.phone,
      email: userData.Auth.email,
      password: userData.Auth.password,
      address: userData.Auth.address,
      level: "0",
      avatar: userData.Auth.avatar,
    });
    setData(userData);
  }, []);
  const handleInput = (e) => {
    //function dùng chung cho các thẻ input,textarea,...
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  function handleUserInputFile(e) {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
  }
  function IsImg() {
    const typeImg = ["png", " jpg", "jpeg", "PNG", "JPG"];
    var img_val = getfile.type.lastIndexOf("/") + 1;
    var checkImg = getfile.type.substring(img_val);
    var result = typeImg.includes(checkImg);
    if (!result) {
      return false;
    } else {
      return true;
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;
    // if (inputs.name == getData.Auth.name) {
    //   flag = false;
    //   errorSubmit.name = "Tên trùng";
    // }
    // if (inputs.phone_new == getData.Auth.phone) {
    //   flag = false;
    //   errorSubmit.phone_new = "Số trùng";
    // }
    // if (!getfile) {
    //   flag = false;
    //   errorSubmit.file = "Vui lòng chọn file";
    // } else if (getfile.size > 1024 * 1024) {
    //   flag = false;
    //   errorSubmit.file = "File vượt quá 1mb";
    // } else if (!IsImg()) {
    //   flag = false;
    //   errorSubmit.file = "File này không phải hình ảnh";
    // }
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});
      // console.log(getData);
      let url =
        "http://localhost:8080/laravel/laravel/public/api/user/update/" +
        getData.Auth.id;
      let accessToken = getData.success.token;
      //   console.log(accessToken);
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      console.log(inputs);
      const formData = new FormData();
      formData.append("name", inputs.name);
      formData.append("email", getData.Auth.email);
      formData.append("password", inputs.password);
      formData.append("address", inputs.address);
      formData.append("phone", inputs.phone);
      formData.append("avatar", getAvatar);
      console.log(formData.append);
      console.log(inputs.name);
      axios.post(url, formData, config).then((res) => {
        console.log(res.data);
        console.log(res.data.errors);
        localStorage.setItem("user_update", JSON.stringify(res.data));
        // setData(res.data);
      });
    }
  };

  return (
    <div>
      {/* <Error error={errors} /> */}
      {/* <MenuLeftAccount /> */}
      <div className="col-sm-4">
        <div className="signup-form">
          {/*sign up form*/}
          <h2>Update</h2>

          <form
            action="#"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleInput}
            />
            <input
              type="email"
              name="email"
              placeholder=""
              value={inputs.email}
              readOnly
              onChange={handleInput}
            />

            <input
              type="number"
              name="phone"
              placeholder="Phone"
              value={inputs.phone}
              onChange={handleInput}
            />
            <input
              type="number"
              name="level_dk"
              placeholder="Level"
              onChange={handleInput}
              value="0"
            />

            <input
              type="password"
              name="password"
              placeholder=" Password"
              value={inputs.password}
              onChange={handleInput}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={inputs.address}
              onChange={handleInput}
            />
            <input type="file" name="avatar" onChange={handleUserInputFile} />
            <button type="submit" className="btn btn-default">
              Update
            </button>
          </form>
          <Error errors={errors} />
        </div>
        {/*/sign up form*/}
      </div>
    </div>
  );
}
export default Update;
