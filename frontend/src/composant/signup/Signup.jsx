import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import "./Signup.css";
import { useState } from "react";

function Signup() {
  const [image, setImage] = useState();
  const [previewSource, setPreviewSource] = useState();
  // eslint-disable-next-line no-unused-vars
  const [fileInputState, setInputState] = useState("");
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    // console.log(image);
    // const formData = {
    //   "file": image,
    //   "upload_preset": "UPLOAD_PROFILE",
    // };
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "UPLOAD_PROFILE");
    console.log("####", formData);

    const res = await axios({
      method: "post",

      url: "https://api.cloudinary.com/v1_1/dalaydhsp/upload",
      data: formData,
    });
    // const profile = res.data["secure_url"];
    const profile = res.data["secure_url"];
    console.log(profile);

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("password don't match");
    } else {
      const user = {
        userName: userName.current.value,
        email: email.current.value,
        password: password.current.value,
        profilePicture:profile
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleImageChange = (imageSelected) => {
    const file = imageSelected[0];
    previewFile(file);
    if (imageSelected) {
      setImage(imageSelected[0]);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
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
          <div>
            <label htmlFor="profileInput"> image</label>
            <input
              type="file"
              id="profileInput"
              name="profile"
              accept="image/png, jpeg, jpg"
              onChange={(e) => handleImageChange(e.target.files)}
              value={fileInputState}
            />
          </div>
          <div className="links">
            <button className="linksButton" type="submit">
              account
            </button>
            {previewSource && <img src={previewSource} alt="chosen" style={{height:"50px"}} />}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
