import Login from "./Login";
import Register from "./Register";

function Index(props) {
  return (
    <>
      <Login />
      <Register />
      {props.children}
    </>
  );
}
export default Index;
