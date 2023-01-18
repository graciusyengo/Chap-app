import axios from "axios";

export const loginCall = async (userCredential, dispatch, navigate) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.user._id);
    console.log(res.data.token);
    console.log(res.data.user._id);
    navigate("/home");
    console.log(res.data);
    console.log(userCredential);

    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
