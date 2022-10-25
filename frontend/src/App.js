import Messenger from "./pages/Messenger/Messenger";
import Login from "./pages/login/Login";
import Signup from "./composant/signup/Signup";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const {user} =useContext(AuthContext)
  return (
    <div className="App">
      {/* <Home/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home />: <Signup/>} />
          <Route path="/login" element={user ? <Navigate to="/" />: <Login/>} />
          <Route path="/signup" element={ user? <Navigate to="/" />:<Signup />} />
          <Route path="/messenger" element={!user ? <Navigate to="/"/> :<Messenger/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
