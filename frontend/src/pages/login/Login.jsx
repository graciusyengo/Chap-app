import { useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import "./Login.css";

import { loginCall } from "../../apiCalls";

// import { Link } from "@material-ui/core";

export default function Login() {

  const email = useRef();
  const password = useRef();
  const {user, isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );

  };

  console.log(user);

  return (
    <div className="login">
      <div className="loginWraper">
        <form className="loginForm" onSubmit={handleClick}>
          <h2> sign in</h2>
          <div className="inputBox" required="required">
            <input type="text" required className="inputEmail" ref={email} />
            <span> email</span>
            <i></i>
          </div>
          <div className="inputBox" required="required">
            <input
              type="text"
              required
              minLength="3"
              className="inputPassword"
              ref={password}
            />
            <span> password</span>
            <i></i>
          </div>
          <div className="links">
            <Link to="/"> forgot password?</Link>
            <Link to="/signup"> signup</Link>
          </div>
          <button className="linksButton" type="submit">
            {isFetching ? <CircularProgress size="18px" /> : "login"}
          </button>
        </form>
      </div>
    </div>
  );
}

