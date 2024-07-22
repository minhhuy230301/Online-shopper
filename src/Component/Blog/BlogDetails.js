import axios from "axios";
import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import Rate from "./Rate";
import MenuLeff from "../MenuLeft";
import ListComments from "./ListComments";
import Cmt from "./Cmt";
import Rate1 from "./Rate1";
// import { Router } from "react-router-dom";

function BlogDetails(props) {
  let params = useParams();
  const [getdata, setData] = useState("");
  const [ListComment1, setListComment1] = useState("");
  const [getID, setId] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/laravel/laravel/public/api/blog/detail/" +
          params.id
      )
      .then((response) => {
        setData(response.data);
        setListComment1(response.data.data.comment);
        // console.log(ListComment1);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  function getCmt(e) {
    const array3 = ListComment1.concat(e);
    setListComment1(array3);
  }
  function IdRep(e) {
    setId(e);
  }
  function fetchData1() {
    if (Object.keys(getdata).length > 0) {
      return (
        <div className="single-blog-post">
          <h3>{getdata.data.title}</h3>
          <div className="post-meta">
            <ul>
              <li>
                <i className="fa fa-user" /> Mac Doe
              </li>
              <li>
                <i className="fa fa-clock-o" /> 1:33 pm
              </li>
              <li>
                <i className="fa fa-calendar" /> DEC 5, 2013
              </li>
            </ul>
            {/* <span>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-half-o"></i>
                  </span> */}
          </div>
          <a href>
            <img
              src={
                "http://localhost:8080/laravel/laravel/public/upload/blog/image/" +
                getdata.data.image
              }
              alt=""
            />
          </a>
          <p>{getdata.data.description}</p> <br />
          <p>{getdata.data.content}</p> <br />
        </div>
      );
    }
  }

  return (
    <div className="container">
      <div className="row">
        {/* <MenuLeff /> */}
        <div className="col-sm-9">
          <div className="blog-post-area">
            <h2 className="title text-center">Latest From our Blog</h2>
            <div>{fetchData1()}</div>
          </div>
          {/* {<Rate />} */}
          {<Rate1 />}
          <ListComments cmts={ListComment1} getId={IdRep} />
          <Comments getCmts={getCmt} Rep={getID} />
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
