import { Component, useEffect, useState } from "react";
import Rate from "./Rate";
import Error from "../../Bài 13/Error";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
function ListComments(props) {
  const [getData, setData] = useState("");
  const [getId, setId] = useState("");
  useEffect(() => {
    setData(props.cmts);
  });
  let params = useParams();
  const [errors, setErrors] = useState({});
  const getIdReply = (e) => {
    console.log(e.target.id);
    setId(e.target.id);
    console.log(getId);
    props.getId(e.target.id);
  };
  function dataComment() {
    if (getData.length > 0) {
      // console.log(getData);

      return getData.map((value, key) => {
        if (value.id_comment == 0) {
          return (
            <div>
              <ul className="media-list">
                <li className="media">
                  <a className="pull-left" href="#">
                    <img
                      className="media-object"
                      // src={
                      //   " http://localhost:8080/laravel/laravel/public/upload/user/avatar/" +
                      //   value.image_user
                      // }
                      alt=""
                    />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li>
                        <i className="fa fa-user" />
                        {value.name_user}
                      </li>
                      <li>
                        <i className="fa fa-clock-o" />{" "}
                        {value.created_at.substring(11)}
                      </li>
                      <li>
                        <i className="fa fa-calendar" />{" "}
                        {value.created_at.substring(0, 10)}
                      </li>
                    </ul>
                    <p>{value.comment}</p>
                    <a
                      id={value.id}
                      className="btn btn-primary"
                      onClick={getIdReply}
                      href="#formComment"
                    >
                      <i className="fa fa-reply" />
                      Replay
                    </a>
                  </div>
                </li>
              </ul>
              {getData.map((value2, key) => {
                if (value.id == value2.id_comment) {
                  return (
                    <ul className="media-list">
                      <li className="media second-media">
                        <a className="pull-left" href="#">
                          <img
                            className="media-object"
                            // src={
                            //   " http://localhost:8080/laravel/laravel/public/upload/user/avatar/" +
                            //   value2.image_user
                            // }
                            alt=""
                          />
                        </a>
                        <div className="media-body">
                          <ul className="sinlge-post-meta">
                            <li>
                              <i className="fa fa-user" />
                              {value2.name_user}
                            </li>
                            <li>
                              <i className="fa fa-clock-o" />{" "}
                              {value2.created_at.substring(11)}
                            </li>
                            <li>
                              <i className="fa fa-calendar" />{" "}
                              {value2.created_at.substring(0, 10)}
                            </li>
                          </ul>
                          <p>{value2.comment}</p>
                          <a
                            id={value2.id}
                            className="btn btn-primary"
                            onClick={getIdReply}
                            href
                          >
                            <i className="fa fa-reply" />
                            Replay
                          </a>
                        </div>
                      </li>
                    </ul>
                  );
                }
              })}
            </div>
          );
        }
      });
    }
  }
  return (
    <div className="response-area">
      <h3>{getData.length} RESPONSES </h3>
      {dataComment()}
      {/* <Comments Rep={getId} /> */}
    </div>
  );
}
export default ListComments;
