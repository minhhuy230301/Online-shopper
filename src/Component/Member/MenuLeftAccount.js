import { Routes, Route, Link, useLocation } from "react-router-dom";
function MenuLeftAccount() {
  return (
    <>
      <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>ACCOUNT</h2>
          <div className="panel-group category-products" id="accordian">
            {/*category-productsr*/}
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link
                    to="/account"
                    data-toggle="collapse"
                    data-parent="#accordian"
                    href="#"
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus" />
                    </span>
                    ACCOUNT
                  </Link>
                </h4>
              </div>
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link
                    to="/account/my-product"
                    data-toggle="collapse"
                    data-parent="#accordian"
                    action="#create-product"
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus" />
                    </span>
                    MY PRODUCT
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MenuLeftAccount;
