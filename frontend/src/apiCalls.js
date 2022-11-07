import axios from "axios";


export const loginCall = async (userCredential, dispatch, navigate) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    localStorage.setItem("token",res.data.token);
    navigate("/home");
    
    console.log(res.data.token);
    console.log(userCredential);

    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
