import { useState } from "react";
import { TextareaHTMLAttributes } from "react";
import Login from "../../Login";
import Error from "../../Bài 13/Error";
import axios from "axios";
function Register(props) {
  const [inputs, setInputs] = useState({
    name: "",
    email_dk: "",
    phone_dk: "",
    pass_dk: "",
    repass_dk: "",
    address: "",
    level_dk: "0",
  });
  const [errors, setErrors] = useState({}); //setError: Lưu trũ toàn bộ lỗi dưới dạng object
  const [getfile, setFile] = useState("");
  const [getAvatar, setAvatar] = useState("");
  const handleInput = (e) => {
    //function dùng chung cho các thẻ input,textarea,...
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  function IsEmail() {
    var regex =
      /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(inputs.email_dk)) {
      return false;
    } else {
      return true;
    }
  }
  // function handleFile(e) {
  //   setFile(e.target.files);
  // }
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
    if (inputs.name == "") {
      flag = false;
      errorSubmit.name = "Vui lòng nhập tên";
    }
    if (inputs.email_dk == "") {
      flag = false;
      errorSubmit.email_dk = "Vui lòng nhập email";
    } else if (!IsEmail()) {
      flag = false;
      errorSubmit.email_dk = "Địa chỉ email không hợp lệ";
    }
    if (inputs.phone_dk == "") {
      flag = false;
      errorSubmit.phone_dk = "Vui lòng nhập số điện thoại";
    }
    if (inputs.level_dk == "") {
      flag = false;
      errorSubmit.level_dk = "Vui lòng nhập level";
    }
    if (inputs.pass_dk == "") {
      flag = false;
      errorSubmit.pass_dk = "Vui lòng nhập password";
    }
    if (inputs.repass_dk == "") {
      flag = false;
      errorSubmit.pass_dk = "Vui lòng xác nhận password";
    }
    if (inputs.address == "") {
      flag = false;
      errorSubmit.address = "Vui lòng nhập địa chỉ";
    }

    if (!getfile) {
      flag = false;
      errorSubmit.file = "Vui lòng chọn file";
    } else if (getfile.size > 1024 * 1024) {
      flag = false;
      errorSubmit.file = "File vượt quá 1mb";
    } else if (!IsImg()) {
      flag = false;
      errorSubmit.file = "File này không phải hình ảnh";
    }
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});
      const data = {
        name: inputs.name,
        password: inputs.pass_dk,
        email: inputs.email_dk,
        address: inputs.address,
        phone: inputs.phone_dk,
        level: 0,
        avatar: getAvatar,
      };
      console.log(data);

      axios
        .post("http://localhost:8080/laravel/laravel/public/api/register", data)
        .then((res) => {
          console.log(res.data.errors);
          localStorage.setItem("user_info", JSON.stringify(res.data));
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            alert("Đăng kí thành công");
          }
        });
    }
  };
  return (
    <div>
      {/* <Error error={errors} /> */}
      <div className="col-sm-1">
        <h2 className="or">OR</h2>
      </div>
      <div className="col-sm-4">
        <div className="signup-form">
          {/*sign up form*/}
          <h2>New User Signup!</h2>

          <form
            action="#"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={inputs.name}
              onChange={handleInput}
            />
            <input
              type="email"
              name="email_dk"
              placeholder="Email Address"
              value={inputs.email_dk}
              onChange={handleInput}
            />

            <input
              type="number"
              name="phone_dk"
              placeholder="Phone"
              value={inputs.phone_dk}
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
              name="pass_dk"
              placeholder="Password"
              value={inputs.pass_dk}
              onChange={handleInput}
            />
            <input
              type="password"
              name="repass_dk"
              placeholder="Confirm Password"
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
              Signup
            </button>
          </form>
          <Error errors={errors} />
        </div>
        {/*/sign up form*/}
      </div>
    </div>
  );
}
export default Register;
