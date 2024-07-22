import { useEffect, useState } from "react";
import axios from "axios";
import Error from "../../Bài 13/Error";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    pass: "",
  });
  const [errors, setErrors] = useState({}); //setError: Lưu trũ toàn bộ lỗi dưới dạng object
  const [getdata, setData] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    //function dùng chung cho các thẻ input,textarea,...
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  function IsEmail() {
    var regex =
      /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(inputs.email)) {
      return false;
    } else {
      return true;
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // var user = {};
    // var user = localStorage.getItem("info");
    // user = JSON.parse(user);
    // console.log(user.pass_dk);
    // console.log(inputs.pass);
    let errorSubmit = {};
    let flag = true;
    if (inputs.email == "") {
      flag = false;
      errorSubmit.email = "Vui lòng nhập email";
    } else if (!IsEmail()) {
      flag = false;
      errorSubmit.email = "Địa chỉ email không hợp lệ";
    }
    // else if (inputs.email !== user.email_dk) {
    //   flag = false;
    //   errorSubmit.email = "Email không tồn tại";
    // }
    if (inputs.pass == "") {
      flag = false;
      errorSubmit.pass = "Vui lòng nhập mật khẩu";
    }
    // if (inputs.pass !== user.pass_dk) {
    //   flag = false;
    //   errorSubmit.email = "Sai mật khẩu";
    // }
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});
      const data = {
        email: inputs.email,
        password: inputs.pass,
        level: 0,
      };
      axios
        .post("http://localhost:8080/laravel/laravel/public/api/login", data)
        .then((res) => {
          console.log(res.data);
          console.log(res.data.errors);
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            alert("Login thành công");
            navigate("/home");
            localStorage.setItem("info1", JSON.stringify(res.data));
          }
        });
      // .catch((error) => console.log(error));
      localStorage.setItem("item1", true);
    }
  };
  return (
    <div className="col-sm-4 col-sm-offset-1">
      <div className="login-form">
        {/*login form*/}
        <h2>Login to your account</h2>
        <form action="#" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={inputs.email}
            onChange={handleInput}
          />
          <input
            type="password"
            name="pass"
            placeholder="Password"
            value={inputs.pass}
            onChange={handleInput}
          />

          <span>
            <input type="checkbox" name="checkbox" className="checkbox" />
            Keep me signed in
          </span>
          <button type="submit" className="btn btn-default">
            Login
          </button>
        </form>
        <Error errors={errors} />
      </div>
      {/*/login form*/}
    </div>
  );
}
export default Login;
