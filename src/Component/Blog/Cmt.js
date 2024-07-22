function Cmt(props) {
  const cm = props.abc;
  console.log(props);
  return (
    <ul className="media-list">
      {cm.map((key, item) => (
        <li className="media">
          <a className="pull-left" href="#">
            <img
              className="media-object"
              src="images/blog/man-two.jpg"
              alt=""
            />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li>
                <i className="fa fa-user" />
                {key.name_user}
              </li>
              <li>
                <i className="fa fa-clock-o" /> 1:33 pm
              </li>
              <li>
                <i className="fa fa-calendar" /> DEC 5, 2013
              </li>
            </ul>
            <p>{key.comment}</p>
            <a className="btn btn-primary" href>
              <i className="fa fa-reply" />
              Replay
            </a>
          </div>
        </li>
      ))}
      ;
    </ul>
  );
}
export default Cmt;
