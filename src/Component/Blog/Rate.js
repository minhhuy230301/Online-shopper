import axios from "axios";
import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Rate(props) {
  let params = useParams();
  const [getData, setData] = useState("");
  // const [getStar, setStar] = useState(0);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/laravel/laravel/public/api/blog/rate/" +
          params.id
      )
      .then((response) => {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  function TbRate() {
    console.log(getData);
    if (getData.length > 0) {
      {
        getData.map((value, key) => {
          const star = value.rate;
          console.log(star);
        });
      }
    }
  }
  return (
    <div className="rating-area">
      <ul className="ratings">
        {TbRate()}
        <li className="rate-this">Rate this item:</li>
        <li>
          <i className="fa fa-star color" />
          <i className="fa fa-star color" />
          <i className="fa fa-star color" />
          <i className="fa fa-star" />
          <i className="fa fa-star" />
        </li>
        <li className="color">(6 votes)</li>
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
export default Rate;
