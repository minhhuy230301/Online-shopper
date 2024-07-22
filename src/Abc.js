import { useContext } from "react";
import { UserContext } from "./UserContext";

function Abc() {
  const user = useContext(UserContext);
  console.log(user);
  return null;
}
export default Abc;
