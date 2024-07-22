import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Error from "../../Bài 13/Error";
import React from "react";
import axios from "axios";
// class Foo extends Component {
function Rate1(props) {
  const [rating, setRating] = useState(0);
  const [getData, setData] = useState("");
  const [errors, setErrors] = useState({});
  let params = useParams();
  function changeRating(newRating, name) {
    //   this.setState({
    //     rating: newRating
    //   });
    setRating(newRating);
    // console.log(newRating);
    //   - xu ly logic va api tai day
    var check = localStorage.getItem("item1");
    check = JSON.parse(check);
    if (check) {
      var userData = localStorage.getItem("info1");
      userData = JSON.parse(userData);
      let url =
        "http://localhost:8080/laravel/laravel/public/api/blog/rate/" +
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
      formData.append("user_id", userData.Auth.id);
      formData.append("blog_id", params.id);
      formData.append("rate", newRating);
      axios.post(url, formData, config).then((response) => {
        // console.log(response);
      });
    }
  }
  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/laravel/laravel/public/api/blog/rate/" +
          params.id
      )
      .then((response) => {
        setData(response.data.data);
        // console.log(Object.keys(getData).length);
        // console.log(rating);
        // setRating(avg);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  var sum = 0,
    avg = 0;
  function RR(e) {
    if (Object.keys(getData).length > 0) {
      // console.log(getData[e].rate);
      sum += getData[e].rate;
      avg = sum / Object.keys(getData).length;
      // console.log(sum);
      // console.log(avg);
    }
  }
  var totail = Object.keys(getData).map(RR);

  return (
    <div className="rating-area">
      <ul className="ratings">
        <li className="rate-this">Rate this item:</li>
        <li>
          <StarRatings
            rating={avg}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={6}
            name="rating"
          />
        </li>
        <li className="color">({Object.keys(getData).length} votes)</li>
      </ul>
      <ul className="tag">
        <li>TAG:</li>
        <li>
          <a className="color" href>
            Pink <span>/</span>
          </a>
        </li>
        <li>
          <a className="color" href>
            T-Shirt <span>/</span>
          </a>
        </li>
        <li>
          <a className="color" href>
            Girls
          </a>
        </li>
      </ul>
    </div>
  );
}
export default Rate1;
