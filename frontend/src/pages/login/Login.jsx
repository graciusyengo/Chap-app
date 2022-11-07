import { useRef, useContext ,useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import "./Login.css";
import axios from "axios";


import { loginCall } from "../../apiCalls";


// import { Link } from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const password = useRef();
  // const [getEmail, setGetEmail] = useState("");
  // const [getPassword, setGetPassword] = useState("");
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const navigate=useNavigate();


  useEffect(() => {
    const testToken = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("/auth/protected", {
          headers: {
            Authorization: token,
          },
        });
        console.log(res);
        navigate("/home");
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    testToken();
  }, []);
 

  const handleClick = (e) => {
    e.preventDefault();
    console.log(user);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch,navigate
    );
 
    // axios
    //   .post("http://localhost:8000/api/auth/login", {getEmail, getPassword })
    //   .then((user) => {
    //     console.log(user);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

 

  return (
    <div className="login">
      <div className="loginWraper">
        <form className="loginForm" onSubmit={handleClick}>
          <h2> sign in</h2>
          <div className="inputBox" required="required">
            <input
              type="text"
              required
              className="inputEmail"
              ref={email}
              // // value={getEmail}
              // onChange={(e) => setGetEmail(e.target.value)}
            />
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
              // value={getPassword}
              // onChange={(e) => setGetPassword(e.target.value)}
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
