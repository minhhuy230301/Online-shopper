import App from "./App";
import HandleInput from "./Bài 32/HandleInput";
import HandleSubmit from "./Bài 32/HandleSubmit";

function Login() {
  return (
    <div className="App">
      <section id="form">
        {/*form*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-1">
              <div className="login-form">
                {/*login form*/}
                <h2>Login to your account</h2>
                <form action="#">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={HandleSubmit}
                  />
                  <input type="password" name="pass" placeholder="Password" />

                  <span>
                    <input
                      type="checkbox"
                      name="checkbox"
                      className="checkbox"
                    />
                    Keep me signed in
                  </span>
                  <button type="submit" className="btn btn-default">
                    Login
                  </button>
                </form>
              </div>
              {/*/login form*/}
            </div>
            <div className="col-sm-1">
              <h2 className="or">OR</h2>
            </div>
            <div className="col-sm-4">
              <div className="signup-form">
                {/*sign up form*/}
                <h2>New User Signup!</h2>
                <form
                  action="#"
                  encType="multipart/form-data"
                  onChange={HandleSubmit}
                >
                  <input
                    type="email"
                    name="email_dk"
                    placeholder="Email Address"
                    onChange={HandleInput}
                  />

                  <input type="number" name="phone_dk" placeholder="Phone" />
                  <input type="number" name="level_dk" placeholder="Level" />

                  <input
                    type="password"
                    name="pass_dk"
                    placeholder="Password"
                  />
                  <input
                    type="password"
                    name="repass_dk"
                    placeholder="Confirm Password"
                  />
                  <input type="file" name="avatar" />
                  <button type="submit" className="btn btn-default">
                    Signup
                  </button>
                </form>
              </div>
              {/*/sign up form*/}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Login;
