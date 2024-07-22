import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function BlogList(props) {
  const [getdata, setData] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8080/laravel/laravel/public/api/blog")
      .then((res) => {
        setData(res.data.blog.data);
      })
      .catch((error) => console.log(error));
  }, []);
  function fetchData() {
    if (getdata.length > 0) {
      return getdata.map((value, key) => {
        return (
          <div className="single-blog-post" value={value.id}>
            <h3>{value.title}</h3>
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
              <span>
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </span>
            </div>
            <a href>
              <img
                src={
                  "http://localhost:8080/laravel/laravel/public/upload/blog/image/" +
                  value.image
                }
                alt=""
              />
            </a>
            <p>{value.description}</p>
            <Link to={"/detail/" + value.id} className="btn btn-primary">
              Read More
            </Link>
          </div>
        );
      });
    }
  }
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              <div>{fetchData()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default BlogList;
