
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Topbar() {
  const { user } = useContext(AuthContext);
  console.log(user);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"> ChatGra</span>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            placeholder="search some video"
            className="input searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLink">
          <span className="">Home</span>
          <span className=""> timeline</span>
        </div>
        <div className="topbarIcon">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Link to="/messenger">
              <Chat />
            </Link>
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/avatar.jpeg"
          }
          alt="profile"
          className="topbarImg"
        />
      </div>
    </div>
  );
}
export default Topbar;
