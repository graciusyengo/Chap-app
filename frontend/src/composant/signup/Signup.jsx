import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
console.log(passwordAgain.current.value)
console.log(password.current.value)
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("password don't match");
    }else{
      const user = {
        userName: userName.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="signup">
      <div className="signupWraper">
        <form className="signupForm" onSubmit={handleClick}>
          <h2> sign up</h2>
          <div className="inputBox" required="required">
            <input type="text" ref={userName} />
            <span> username</span>
            <i></i>
          </div>
          <div className="inputBox" required="required">
            <input type="text" ref={email} />
            <span> email</span>
            <i></i>
          </div>
          <div className="inputBox" required="required">
            <input type="text" ref={password} />
            <span> password</span>
            <i></i>
          </div>
          <div className="inputBox" required="required">
            <input type="text" ref={passwordAgain} />
            <span> passwordAgain</span>
            <i></i>
          </div>
          <div className="links">
            <button className="linksButton" type="submit">
              
              account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
