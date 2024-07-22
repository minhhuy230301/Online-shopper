import MyProduct from "./MyProduct";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import EditProduct from "./EditProduct";
import { useState } from "react";
function IndexProduct(props) {
  let param1 = useLocation();
  const [setEdit, getEdit] = useState(58);
  return (
    <>
      {/* {param1["pathname"].includes("/edit-product") ? (
        <EditProduct setEdit={setEdit} />
      ) : (
        <MyProduct getEdit={getEdit} />
      )} */}
      {/* {props.children} */}
      <MyProduct getEdit={getEdit} />
    </>
    // <>
    //   <EditProduct />
    //   <MyProduct />
    // </>
  );
}
export default IndexProduct;
