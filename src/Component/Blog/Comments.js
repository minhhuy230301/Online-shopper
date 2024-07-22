import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Error from "../../Bài 13/Error";
import { useParams } from "react-router-dom";
function Comments(props) {
  const [inputs, setInputs] = useState({
    comment: "",
  });
  let params = useParams();
  // console.log(props.Rep);
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  const [errors, setErrors] = useState({});
  const HandleSubmit = (e) => {
    e.preventDefault();

    console.log(inputs.comment);
    console.log(inputs);
    var check = localStorage.getItem("item1");
    check = JSON.parse(check);
    if (check) {
      if (inputs.comment == "") {
        alert("Vui lòng nhập bình luận");
      } else {
        var userData = localStorage.getItem("info1");
        userData = JSON.parse(userData);
        let url =
          "http://localhost:8080/laravel/laravel/public/api/blog/comment/" +
          params.id;
        let accessToken = userData.success.token;
        let config = {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        };
        const formData = new FormData();
        formData.append("id_blog", params.id);
        formData.append("id_user", userData.Auth.id);
        formData.append("id_comment", props.Rep ? props.Rep : 0);
        formData.append("comment", inputs.comment);
        formData.append("image_user", userData.Auth.avatar);
        formData.append("name_user", userData.Auth.name);

        axios.post(url, formData, config).then((response) => {
          console.log(response.data.data);
          props.getCmts(response.data.data);
        });
      }
    } else {
      alert("Vui lòng đăng nhập");
    }
  };

  return (
    <div className="replay-box">
      <div className="row">
        <div className="col-sm-12">
          <h2>Leave a replay</h2>
          <div className="text-area">
            <div className="blank-arrow">
              <label>Your Name</label>
            </div>
            <span>*</span>
            <textarea
              id="formComment"
              name="comment"
              rows={11}
              defaultValue={""}
              value={inputs.comment}
              onChange={handleInput}
            />
            <a className="btn btn-primary" href onClick={HandleSubmit}>
              Post comment
            </a>
          </div>
        </div>
      </div>
      <Error errors={errors} />
    </div>
  );
}
export default Comments;
